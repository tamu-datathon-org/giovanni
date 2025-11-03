"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cat, Dog, Fish, Turtle, Loader2 } from "lucide-react";

import QRScanner from "~/app/_components/organizer/qr-scanner";
import { MultiSelect } from "~/app/_components/multiselect";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { env } from "~/env";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";

/** ---------------------------------------------
 * Types & constants
 * ----------------------------------------------*/
const STATUS_OPTIONS = [
  { label: "Pending", value: "pending", icon: Turtle },
  { label: "Accepted", value: "accepted", icon: Dog },
  { label: "Rejected", value: "rejected", icon: Cat },
  { label: "Waitlisted", value: "waitlisted", icon: Fish },
];

type PhaseName = string;

interface ParticipantData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRestrictions: string;
  status: string;
  extraInfo: string;
  checkedIn: boolean;        // phase-specific
  checkedInAt?: string | null;
}

const DEFAULT_PARTICIPANT: ParticipantData = {
  userId: "404",
  firstName: "Participant",
  lastName: "Not Found",
  email: "404@tamudatathon.com",
  dietaryRestrictions: "None",
  status: "Pending",
  extraInfo: "None",
  checkedIn: false,
  checkedInAt: null,
};

/** ---------------------------------------------
 * Loading Overlay
 * ----------------------------------------------*/
function LoadingOverlay({ show, label }: { show: boolean; label: string }) {
  if (!show) return null;
  return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg dark:bg-neutral-900">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      </div>
  );
}

export default function PassportPage() {
  /** ---------------- Env ---------------- */
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME as string | undefined;

  /** ---------------- State ---------------- */
  const [participant, setParticipant] = useState<ParticipantData>(DEFAULT_PARTICIPANT);
  const [selectedPhase, setSelectedPhase] = useState<PhaseName>(""); // dynamic
  // const [allowedStatuses, setAllowedStatuses] = useState<string[]>(["accepted", "waitlisted"]);

  // Manual & Scanner email handling
  const [manualEmail, setManualEmail] = useState<string>("");
  const [scannerEmail, setScannerEmail] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  // Tracks why we're loading (null | "scan" | "manual" | "phase")
  const [pendingSource, setPendingSource] = useState<null | "scan" | "manual" | "phase">(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /** ---------------- Phases (dynamic) ---------------- */
  const phasesQuery = api.application.listPhases.useQuery(
      { eventName: eventName ?? "" },
      { enabled: Boolean(eventName), refetchOnWindowFocus: false }
  );

  const phaseOptions = useMemo(
      () =>
          (phasesQuery.data ?? []).map((p) => ({
            label: p.name,
            value: p.name as PhaseName,
          })),
      [phasesQuery.data]
  );

  // Default phase once loaded
  useEffect(() => {
    if (!selectedPhase && phaseOptions.length > 0) {
      setSelectedPhase(phaseOptions[0]!.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseOptions.length]);

  /** Resolve the email the query should use (only submittedEmail). */
  const effectiveEmail = useMemo(() => submittedEmail.trim(), [submittedEmail]);

  /** ---------------- Queries ---------------- */
  const queryData = api.application.getCheckInStatus.useQuery(
      {
        eventName: eventName ?? "",
        email: effectiveEmail,
        phase: selectedPhase,
      } as any,
      {
        enabled: Boolean(eventName) && Boolean(effectiveEmail) && Boolean(selectedPhase),
        keepPreviousData: true,
        staleTime: 10_000,
        refetchOnWindowFocus: false,
      }
  );

  /** Apply query outcome to UI & clear loading flag when fetch completes */
  useEffect(() => {
    if (queryData.isSuccess && queryData.data) {
      setParticipant(queryData.data as unknown as ParticipantData);
    }
    if (queryData.isError) {
      setParticipant(DEFAULT_PARTICIPANT);
      if (effectiveEmail) {
        toast({
          variant: "destructive",
          title: "Lookup Failed",
          description: "Participant not found for the selected phase.",
        });
      }
    }
  }, [queryData.isSuccess, queryData.isError, queryData.data, effectiveEmail]);

  // Clear the overlay once network fetch settles
  useEffect(() => {
    if (!queryData.isFetching && pendingSource) {
      setPendingSource(null);
    }
  }, [queryData.isFetching, pendingSource]);

  /** When the phase changes and we have an email, refetch with overlay */
  useEffect(() => {
    if (effectiveEmail && queryData.refetch) {
      setPendingSource("phase");
      void queryData.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhase]);

  /** ---------------- Mutations ---------------- */
  const statusMutation = api.application.updateCheckInStatus.useMutation();

  const updateCheckIn = async (newStatus: boolean) => {
    if (!eventName) {
      toast({
        variant: "destructive",
        title: "Missing event",
        description: "NEXT_PUBLIC_EVENT_NAME is not set.",
      });
      return;
    }
    if (!selectedPhase) {
      toast({
        variant: "destructive",
        title: "Missing phase",
        description: "Select a phase first.",
      });
      return;
    }
    if (!effectiveEmail) {
      toast({
        variant: "destructive",
        title: "Missing email",
        description: "Scan a QR or type an email, then click Search.",
      });
      return;
    }

    try {
      const updated = await statusMutation.mutateAsync(
          {
            eventName,
            email: effectiveEmail,
            phase: selectedPhase, // send the NAME; server resolves to event_phase_id
            newStatus,
          } as any
      );

      toast({
        variant: "success",
        title: `${newStatus ? "ADDED" : "REMOVED"} Check-in Successful`,
        description: `Participant ${newStatus ? "checked in" : "removed"} for ${selectedPhase}.`,
      });

      if (updated) {
        console.log(updated)
        setParticipant({...participant, checkedIn: updated.checkedIn});
      } else {
        setParticipant(DEFAULT_PARTICIPANT);
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Check-in Failed",
        description: e?.message ?? "Unknown error",
      });
    }
  };

  /** ---------------- Handlers ---------------- */
  const handleSearch = () => {
    const val = manualEmail.trim();
    if (!val) return;
    setPendingSource("manual");
    setSubmittedEmail(val);
  };

  const handleClear = () => {
    setManualEmail("");
    setScannerEmail("");
    setSubmittedEmail("");
    setParticipant(DEFAULT_PARTICIPANT);
  };

  const handleCheckIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void updateCheckIn(true);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void updateCheckIn(false);
  };

  /** ---------------- UI ---------------- */
  const currentPhaseLabel = selectedPhase || "—";

  if (!eventName) {
    return (
        <div className="p-6 text-red-600">
          <h1 className="text-2xl font-bold">Configuration Error</h1>
          <p className="mt-2">
            <code>NEXT_PUBLIC_EVENT_NAME</code> is not set. Please define it in your environment.
          </p>
        </div>
    );
  }

  // Overlay label based on what triggered the fetch
  const overlayLabel =
      pendingSource === "scan"
          ? "Looking up participant from QR…"
          : pendingSource === "manual"
              ? "Searching participant by email…"
              : pendingSource === "phase"
                  ? `Loading ${currentPhaseLabel}…`
                  : "Loading…";

  const anyBlockingLoad = Boolean(pendingSource) && queryData.isFetching;

  return (
      <div className="relative flex flex-col items-center justify-center gap-4 p-4 text-black dark:text-white">
        {/* Loading Overlay */}
        <LoadingOverlay show={anyBlockingLoad} label={overlayLabel} />

        <h1 className="text-3xl font-bold">Check-in System</h1>

        {/* Phase Selector (dynamic) */}
        <div className="w-full sm:w-1/2 text-center p-4">
          <label className="mr-2 font-medium">Phase</label>
          <Select
              value={selectedPhase}
              onValueChange={(v) => setSelectedPhase(v as PhaseName)}
              disabled={anyBlockingLoad || statusMutation.isPending || phasesQuery.isLoading || phasesQuery.isError}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue
                  placeholder={
                    phasesQuery.isLoading
                        ? "Loading phases…"
                        : phasesQuery.isError
                            ? "Failed to load phases"
                            : "Select phase"
                  }
              />
            </SelectTrigger>
            <SelectContent>
              {phaseOptions.length === 0 && !phasesQuery.isLoading ? (
                  <div className="px-3 py-2 text-sm opacity-70">No phases found for this event.</div>
              ) : (
                  phaseOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                  ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Scanner & manual override */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm opacity-80">
            Currently Scanning: {scannerEmail || "—"}
          </div>

          <QRScanner
              onScan={(val) => {
                const v = String(val || "").trim();
                setScannerEmail(v);
                if (v) {
                  setPendingSource("scan");
                  setSubmittedEmail(v); // auto-submit scanned email
                }
              }}
          />

          <div className="w-full sm:w-1/2 text-center p-4">
            <label className="block mb-1">Manual Override Input:</label>
            <div className="flex flex-col gap-2">
              <Input
                  className="border border-black bg-orange-100 dark:bg-orange-200 text-black"
                  ref={inputRef}
                  placeholder="enter email here"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  disabled={anyBlockingLoad || statusMutation.isPending}
              />
              <div className="flex gap-2">
                <Button
                    type="button"
                    variant="default"
                    onClick={handleSearch}
                    disabled={!manualEmail.trim() || anyBlockingLoad || statusMutation.isPending}
                >
                  Search
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClear}
                    disabled={
                        anyBlockingLoad ||
                        statusMutation.isPending ||
                        (!manualEmail && !scannerEmail && !submittedEmail)
                    }
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Currently selected/queried email */}
            <div className="mt-2 text-xs opacity-70">
              Active Email: {effectiveEmail || "—"}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
                className="bg-cyan-700 hover:bg-opacity-50"
                onClick={handleCheckIn}
                disabled={statusMutation.isPending || anyBlockingLoad || !effectiveEmail || !selectedPhase}
            >
              {statusMutation.isPending ? "Loading..." : "Check-in Participant"}
            </Button>
            <Button
                variant="secondary"
                onClick={handleRemove}
                disabled={statusMutation.isPending || anyBlockingLoad || !effectiveEmail || !selectedPhase}
            >
              {statusMutation.isPending ? "Loading..." : "Remove Participant"}
            </Button>
          </div>
        </div>

        {/* Participant card */}
        <div className="flex flex-col items-center rounded-md bg-orange-100 dark:bg-orange-400 p-4 w-full sm:w-2/3">
          <h2 className="mb-1 text-2xl font-bold">Participant&apos;s Data</h2>
          <p className="text-sm opacity-80 mb-2">Phase: {currentPhaseLabel}</p>
          <p>Name: {participant.firstName} {participant.lastName}</p>
          <p className="text-cyan-600">Status: {participant.status}</p>
          <p className="text-indigo-500">
            Checked In:{" "}
            <span className={participant.checkedIn ? "text-green-600" : "text-red-600"}>
            {participant.checkedIn ? "True" : "False"}
          </span>
          </p>
          {participant.checkedInAt && (
              <p className="text-sm opacity-80">
                Checked In At:{" "}
                {new Date(participant.checkedInAt).toLocaleString(undefined, { hour12: true })}
              </p>
          )}
          <p>
            Dietary Restrictions:{" "}
            {participant.dietaryRestrictions ? participant.dietaryRestrictions : "None"}
          </p>
          <p>Email: {participant.email}</p>
          <p>Extra Info: {participant.extraInfo ? participant.extraInfo : "None"}</p>
        </div>

        {/* Divider */}
        {/* <div className="my-2 w-1/2 border-2 border-black" /> */}

        {/* Allowed statuses */}
        {/* <div className="mx-4 w-full text-center sm:w-1/2 flex flex-col items-center gap-3">
          <div className="w-full">
            <h2 className="mb-2">Select Allowed Statuses:</h2>
            <MultiSelect
                options={STATUS_OPTIONS}
                onValueChange={setAllowedStatuses}
                defaultValue={allowedStatuses}
                placeholder="Select Allowed Statuses"
                variant="inverted"
                animation={2}
                maxCount={4}
                disabled={anyBlockingLoad || statusMutation.isPending}
            />
          </div>
        </div> */}
      </div>
  );
}
