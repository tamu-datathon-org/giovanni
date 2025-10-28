"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cat, Dog, Fish, Turtle } from "lucide-react";

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
type Phase = "main" | "meal1" | "meal2" | "meal3" | "meal4";

const PHASE_OPTIONS: { label: string; value: Phase }[] = [
  { label: "Main Check-in", value: "main" },
  { label: "Meal 1", value: "meal1" },
  { label: "Meal 2", value: "meal2" },
  { label: "Meal 3", value: "meal3" },
  { label: "Meal 4", value: "meal4" },
];

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending", icon: Turtle },
  { label: "Accepted", value: "accepted", icon: Dog },
  { label: "Rejected", value: "rejected", icon: Cat },
  { label: "Waitlisted", value: "waitlisted", icon: Fish },
];

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

export default function PassportPage() {
  /** ---------------- Env ---------------- */
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME as string | undefined;

  /** ---------------- State ---------------- */
  const [participant, setParticipant] = useState<ParticipantData>(DEFAULT_PARTICIPANT);

  const [selectedPhase, setSelectedPhase] = useState<Phase>("main");

  const [allowedStatuses, setAllowedStatuses] = useState<string[]>([
    "accepted",
    "waitlisted",
  ]);

  // Manual & Scanner email handling
  const [manualEmail, setManualEmail] = useState<string>("");
  const [scannerEmail, setScannerEmail] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

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
      },
  );

  /** Apply query outcome to UI */
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

  /** When the phase changes and we have an email, refetch */
  useEffect(() => {
    if (effectiveEmail && queryData.refetch) {
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
            phase: selectedPhase,
            newStatus,
            allowedStatuses,
          } as any,
      );

      const label = PHASE_OPTIONS.find((p) => p.value === selectedPhase)?.label ?? selectedPhase;
      toast({
        variant: "success",
        title: `${newStatus ? "ADDED" : "REMOVED"} Check-in Successful`,
        description: `Participant ${newStatus ? "checked in" : "removed"} for ${label}.`,
      });

      if (updated) {
        setParticipant(updated as ParticipantData);
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
  const currentPhaseLabel =
      PHASE_OPTIONS.find((e) => e.value === selectedPhase)?.label ?? selectedPhase;

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

  return (
      <div className="relative flex flex-col items-center justify-center gap-4 p-4 text-black dark:text-white">
        <h1 className="text-3xl font-bold">Check-in System</h1>

        {/* Phase Selector */}
        <div className="w-full sm:w-1/2 text-center p-4">
          <label className="mr-2 font-medium">Phase</label>
          <Select value={selectedPhase} onValueChange={(v) => setSelectedPhase(v as Phase)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              {PHASE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
              ))}
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
                if (v) setSubmittedEmail(v); // auto-submit scanned email
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
              />
              <Button
                  type="button"
                  variant="default"
                  onClick={handleSearch}
                  disabled={!manualEmail.trim()}
              >
                Search
              </Button>
              <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClear}
                  disabled={
                      !manualEmail && !scannerEmail && !submittedEmail && participant === DEFAULT_PARTICIPANT
                  }
              >
                Clear
              </Button>
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
                disabled={statusMutation.isPending || !effectiveEmail}
            >
              {statusMutation.isPending ? "Loading..." : "Check-in Participant"}
            </Button>
            <Button
                variant="secondary"
                onClick={handleRemove}
                disabled={statusMutation.isPending || !effectiveEmail}
            >
              {statusMutation.isPending ? "Loading..." : "Remove Participant"}
            </Button>
          </div>
        </div>

        {/* Participant card */}
        <div className="flex flex-col items-center rounded-md bg-orange-100 dark:bg-orange-400 p-4 w-full sm:w-2/3">
          <h2 className="mb-1 text-2xl font-bold">Participant&apos;s Data</h2>
          <p className="text-sm opacity-80 mb-2">Phase: {currentPhaseLabel}</p>
          <p>
            Name: {participant.firstName} {participant.lastName}
          </p>
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
                {new Date(participant.checkedInAt).toLocaleString(undefined, {
                  hour12: true,
                })}
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
        <div className="my-2 w-1/2 border-2 border-black" />

        {/* Allowed statuses & Remove */}
        <div className="mx-4 w-full text-center sm:w-1/2 flex flex-col items-center gap-3">
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
            />
          </div>
        </div>
      </div>
  );
}
