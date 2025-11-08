"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cat, Dog, Fish, Turtle, Loader2 } from "lucide-react";

import QRScanner from "~/app/_components/organizer/passport/qr-scanner";
import { ManualEmailInput } from "~/app/_components/organizer/passport/manual-email-input";
import { ParticipantCard } from "~/app/_components/organizer/passport/participant-card";
import { PhaseSelector } from "~/app/_components/organizer/passport/phase-selector";
import { MultiSelect } from "~/app/_components/multiselect";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

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
  eventAttendance: boolean;
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
  eventAttendance: false,
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
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME as string | undefined;

  /** ---------------- State ---------------- */
  const [participant, setParticipant] = useState<ParticipantData>(DEFAULT_PARTICIPANT);
  const [selectedPhase, setSelectedPhase] = useState<PhaseName>(""); // dynamic
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [allowedStatuses, setAllowedStatuses] = useState<string[]>(["accepted", "waitlisted"]);

  // Manual & Scanner email handling
  const [manualEmail, setManualEmail] = useState<string>("");
  const [scannerEmail, setScannerEmail] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
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
        staleTime: 10_000,
        refetchOnWindowFocus: false,
        retry: 1,
      }
  );

  /** Apply query outcome to UI & clear loading flag when fetch completes */
  useEffect(() => {
    if (queryData.isSuccess && queryData.data) {
      setParticipant(queryData.data as unknown as ParticipantData);
      setIsDialogOpen(true);
    }
    if (queryData.isError) {
      setParticipant(DEFAULT_PARTICIPANT);
      setIsDialogOpen(false);
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
  const handleSearch = async () => {
    const val = manualEmail.trim();
    if (!val) return;
    setPendingSource("manual");
    setSubmittedEmail(val);
    if (queryData.refetch) {
      const result = await queryData.refetch();
      if (result.isSuccess && result.data) {
        setIsDialogOpen(true);
      }
    }
  };

  const handleClear = () => {
    setManualEmail("");
    setScannerEmail("");
    setSubmittedEmail("");
    setParticipant(DEFAULT_PARTICIPANT);
  };

  const handleCheckIn = () => {
    void updateCheckIn(true);
  };

  const handleRemove = () => {
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
      <div className="relative flex flex-col items-center justify-center gap-2 p-4 text-black dark:text-white">
        {/* Loading Overlay */}
        <LoadingOverlay show={anyBlockingLoad} label={overlayLabel} />

        <h1 className="text-3xl font-bold">Check-in System</h1>

        {/* Phase Selector (dynamic) */}
        <PhaseSelector
          selectedPhase={selectedPhase}
          setSelectedPhase={(v) => setSelectedPhase(v as PhaseName)}
          phaseOptions={phaseOptions}
          isLoading={phasesQuery.isLoading}
          isError={phasesQuery.isError}
          isDisabled={anyBlockingLoad || statusMutation.isPending || phasesQuery.isLoading || phasesQuery.isError}
        />

        {/* Scanner & manual override */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-sm opacity-80">
            Currently Scanning: {scannerEmail || "—"}
          </div>

          <QRScanner
              onScan={async (val) => {
                const v = String(val || "").trim();
                setScannerEmail(v);
                if (v) {
                  setPendingSource("scan");
                  setSubmittedEmail(v); // auto-submit scanned email
                  if (queryData.refetch) {
                    const result = await queryData.refetch();
                    if (result.isSuccess && result.data) {
                      setIsDialogOpen(true);
                    }
                  }
                }
              }}
          />

          <ManualEmailInput
            manualEmail={manualEmail}
            setManualEmail={setManualEmail}
            handleSearch={handleSearch}
            handleClear={handleClear}
            inputRef={inputRef}
            anyBlockingLoad={anyBlockingLoad}
            isPendingMutation={statusMutation.isPending}
            scannerEmail={scannerEmail}
            submittedEmail={submittedEmail}
            effectiveEmail={effectiveEmail}
          />
        </div>

        {/* Participant card */}
        <ParticipantCard
          participant={participant}
          currentPhaseLabel={currentPhaseLabel}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onCheckIn={handleCheckIn}
          onRemove={handleRemove}
          isLoading={statusMutation.isPending}
          isDisabled={statusMutation.isPending || anyBlockingLoad || !effectiveEmail || !selectedPhase}
        />

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
