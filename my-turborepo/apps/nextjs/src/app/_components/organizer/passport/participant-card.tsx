import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface ParticipantData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRestrictions: string;
  status: string;
  extraInfo: string;
  checkedIn: boolean;
  checkedInAt?: string | null;
}

interface ParticipantCardProps {
  participant: ParticipantData;
  currentPhaseLabel: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  showTrigger?: boolean;
  onCheckIn: () => void;
  onRemove: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export function ParticipantCard({
  participant,
  currentPhaseLabel,
  isOpen,
  onOpenChange,
  showTrigger = true,
  onCheckIn,
  onRemove,
  isLoading,
  isDisabled
}: ParticipantCardProps) {
  // Automatically open dialog when participant data is valid (not default)
  useEffect(() => {
    if (showTrigger && participant.email !== "404@tamudatathon.com") {
      onOpenChange(true);
    }
  }, [participant.email, onOpenChange, showTrigger]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-orange-100 dark:bg-orange-400 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Participant&apos;s Data
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm opacity-80">Phase: {currentPhaseLabel}</p>
          <p className="flex-row" >
            <p>Name: {participant.firstName} {participant.lastName}</p>
            <p>Email: {participant.email}</p>
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
              {new Date(participant.checkedInAt).toLocaleString(undefined, { hour12: true })}
            </p>
          )}
          <p>
            Dietary Restrictions:{" "}
            {participant.dietaryRestrictions ? participant.dietaryRestrictions : "None"}
          </p>
          <p>Extra Info: {participant.extraInfo ? participant.extraInfo : "None"}</p>
        </div>
        <DialogFooter className="flex gap-6 justify-center mt-4">
          <Button
            className="bg-red-700 hover:bg-opacity-50"
            onClick={onRemove}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Remove Participant"}
          </Button>
          <Button
            className="bg-green-700 hover:bg-opacity-50"
            onClick={onCheckIn}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Check-in Participant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}