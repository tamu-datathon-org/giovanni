"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cat, Dog, Fish, Turtle } from "lucide-react";

import { MultiSelect } from "~/app/_components/multiselect";
import QRScanner from "~/app/_components/organizer/qr-scanner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
 * Types & defaults
 * ----------------------------------------------*/
interface ParticipantData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRestrictions: string;
  status: string;
  extraInfo: string;
  checkedIn: boolean; // for the currently selected phase
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
};

/** ---------------------------------------------
 * Phases within ONE event (main + 4 meals)
 * We keep eventName fixed to NEXT_PUBLIC_EVENT_NAME and switch by phase.
 * ----------------------------------------------*/
const PHASE_OPTIONS = [
  { label: "Main Check-in", value: "main" },
  { label: "Meal 1", value: "meal1" },
  { label: "Meal 2", value: "meal2" },
  { label: "Meal 3", value: "meal3" },
  { label: "Meal 4", value: "meal4" },
] as const;

type Phase = (typeof PHASE_OPTIONS)[number]["value"];

/** ---------------------------------------------
 * Status options for allowed check-in gating
 * ----------------------------------------------*/
const STATUS_OPTIONS = [
  { label: "Pending", value: "pending", icon: Turtle },
  { label: "Accepted", value: "accepted", icon: Dog },
  { label: "Rejected", value: "rejected", icon: Cat },
  { label: "Waitlisted", value: "waitlisted", icon: Fish },
];

export default function PassportPage() {
  /** ---------------- State ---------------- */
  const [participant, setParticipant] = useState<ParticipantData>(
      DEFAULT_PARTICIPANT,
  );
  const [scannerEmail, setScannerEmail] = useState<string>("");
  const [manualEmail, setManualEmail] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<Phase>(PHASE_OPTIONS[0]!.value);
  const [allowedStatuses, setAllowedStatuses] = useState<string[]>([
    "accepted",
    "waitlisted",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  /** Resolve the email to use (manual overrides scan). Do not force lowercase unless server normalizes. */
  const effectiveEmail = useMemo(() => {
    const chosen = (manualEmail?.trim() || scannerEmail?.trim() || "");
    return chosen;
  }, [manualEmail, scannerEmail]);

  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME as string;

  /** ---------------- Query: read current phase-specific status ---------------- */
  const queryData = api.application.getCheckInStatus.useQuery(
      {
        eventName,
        email: effectiveEmail,
        phase: selectedPhase,
      } as any, // server type will include `phase` after you update the router
      {
        enabled: Boolean(eventName) && Boolean(effectiveEmail) && Boolean(selectedPhase),
        keepPreviousData: true,
        staleTime: 10_000,
      },
  );

  /** Apply query outcome to UI */
  useEffect(() => {
    if (queryData.isSuccess && queryData.data) {
      setParticipant(queryData.data as unknown as ParticipantData);
    }
    if (queryData.isError) {
      setParticipant(DEFAULT_PARTICIPANT);
      toast({
        variant: "destructive",
        title: "Lookup Failed",
        description: "Participant not found for the selected phase.",
      });
    }
  }, [queryData.isSuccess, queryData.isError, queryData.data]);

  /** ---------------- Mutation: write phase-specific check-in ---------------- */
  const statusMutation = api.application.updateCheckInStatus.useMutation();

  const updateCheckIn = async (newStatus: boolean) => {
    const email = effectiveEmail;

    if (!eventName) {
      toast({ variant: "destructive", title: "Missing event", description: "Missing base event name." });
      return;
    }
    if (!selectedPhase) {
      toast({ variant: "destructive", title: "Missing phase", description: "Select a phase first." });
      return;
    }
    if (!email) {
      toast({ variant: "destructive", title: "Missing email", description: "Scan a QR or type an email." });
      return;
    }

    try {
      const updated = await statusMutation.mutateAsync(
          {
            eventName,
            email,
            phase: selectedPhase,
            newStatus,
            allowedStatuses,
          } as any, // server input will include `phase`
          {
            onSuccess: () => {
              const label = PHASE_OPTIONS.find((p) => p.value === selectedPhase)?.label;
              toast({
                variant: "success",
                title: `${newStatus ? "ADDED" : "REMOVED"} Check-in Successful`,
                description: `Participant ${newStatus ? "checked in" : "removed"} for ${label}.`,
              });
            },
            onError: (e: any) => {
              toast({ variant: "destructive", title: "Check-in Failed", description: e?.message ?? "Unknown error" });
            },
          },
      );

      if (updated) {
        setParticipant(updated as unknown as ParticipantData);
      } else {
        setParticipant(DEFAULT_PARTICIPANT);
      }
    } catch {
      setParticipant(DEFAULT_PARTICIPANT);
    }
  };

  /** ---------------- Handlers ---------------- */
  const handleCheckIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCheckIn(true);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCheckIn(false);
  };

  /** ---------------- UI ---------------- */
  const currentPhaseLabel = useMemo(
      () => PHASE_OPTIONS.find((e) => e.value === selectedPhase)?.label ?? selectedPhase,
      [selectedPhase],
  );

  return (
      <div className="relative flex flex-col items-center justify-center gap-3 p-4 text-black dark:text-white">
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
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Currently Scanning: {scannerEmail || "—"}</div>
          <QRScanner onScan={(val) => setScannerEmail(String(val || ""))} />

          <div className="w-full sm:w-1/2 text-center p-4">
            <label className="block mb-1">Manual Override Input:</label>
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
            />
          </div>

          <Button
              className="bg-cyan-700 hover:bg-opacity-50"
              onClick={handleCheckIn}
              disabled={statusMutation.isPending}
          >
            {statusMutation.isPending ? "Loading..." : "Check-in Participant"}
          </Button>
        </div>

        {/* Participant card */}
        <div className="flex flex-col items-center rounded-md bg-orange-100 dark:bg-orange-400 p-4 w-full sm:w-2/3">
          <h2 className="mb-1 text-2xl font-bold">Participant's Data</h2>
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
          <p>
            Dietary Restrictions:{" "}
            {participant.dietaryRestrictions ? participant.dietaryRestrictions : "None"}
          </p>
          <p>Email: {participant.email}</p>
          <p>
            Extra Info: {participant.extraInfo ? participant.extraInfo : "None"}
          </p>
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

          <Button variant="secondary" onClick={handleRemove} disabled={statusMutation.isPending}>
            {statusMutation.isPending ? "Loading..." : "Remove Participant"}
          </Button>
        </div>
      </div>
  );
}
