import React, { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ParticipantData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dietaryRestrictions: string;
  status: string;
  extraInfo: string;
  eventAttendance: boolean;
  checkedIn: boolean;
  checkedInAt?: string | null;
  foodGroup?: string | null;
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
  isDisabled,
}: ParticipantCardProps) {
  // Automatically open dialog when participant data is valid (not default)
  useEffect(() => {
    if (showTrigger && participant.email !== "404@tamudatathon.com") {
      onOpenChange(true);
    }
  }, [participant.email, onOpenChange, showTrigger]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          "max-w-md bg-orange-100 dark:bg-orange-100 " +
          (participant.eventAttendance
            ? "border-4 border-green-700 dark:border-4 dark:border-green-700"
            : "border-4 border-red-700 dark:border-4 dark:border-red-700")
        }
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Participant&apos;s Data
          </DialogTitle>
        </DialogHeader>
        <div>
          <span className="flex flex-row justify-center gap-2 text-sm text-gray-900">
            <p>
              Phase:{" "}
              <span className="text-indigo-700">{currentPhaseLabel}</span>
            </p>
            <p>
              Checked In:{" "}
              <span
                className={
                  participant.checkedIn ? "text-green-600" : "text-red-600"
                }
              >
                {participant.checkedIn ? "True" : "False"}
              </span>
            </p>
          </span>
          {participant.checkedInAt && (
            <p className="text-center text-sm text-gray-900 opacity-70">
              checked in at:{" "}
              {new Date(participant.checkedInAt).toLocaleString(undefined, {
                hour12: true,
              })}
            </p>
          )}
        </div>
        <div className="text-center text-gray-900">
          <p>
            Name: {participant.firstName} {participant.lastName}
          </p>
          <p>Email: {participant.email}</p>
          <p>
            Status:{" "}
            <span
              className={
                participant.status === "accepted"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {participant.status}
            </span>
          </p>
          <p>
            Food Group: {participant.foodGroup ? participant.foodGroup : "None"}
          </p>
          <p>
            Dietary Restrictions:{" "}
            {participant.dietaryRestrictions
              ? participant.dietaryRestrictions
              : "None"}
          </p>
          <p>
            Extra Info: {participant.extraInfo ? participant.extraInfo : "None"}
          </p>
        </div>
        <DialogFooter className="mt-4 flex flex-row justify-center gap-4 sm:justify-center">
          <Button
            className="bg-red-700 hover:bg-opacity-50"
            onClick={onRemove}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Remove"}
          </Button>
          <Button
            className="bg-green-700 hover:bg-opacity-50"
            onClick={onCheckIn}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? "Loading..." : "Check-in"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
