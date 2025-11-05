import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";

interface PhaseOption {
  label: string;
  value: string;
}

interface PhaseSelectorProps {
  selectedPhase: string;
  setSelectedPhase: (phase: string) => void;
  phaseOptions: PhaseOption[];
  isLoading: boolean;
  isError: boolean;
  isDisabled: boolean;
}

export function PhaseSelector({
  selectedPhase,
  setSelectedPhase,
  phaseOptions,
  isLoading,
  isError,
  isDisabled,
}: PhaseSelectorProps) {
  return (
    <div className="w-full sm:w-1/2 text-center p-4">
      <label className="mr-2 font-medium">Phase</label>
      <Select
        value={selectedPhase}
        onValueChange={setSelectedPhase}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue
            placeholder={
              isLoading
                ? "Loading phases…"
                : isError
                ? "Failed to load phases"
                : "Select phase"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {phaseOptions.length === 0 && !isLoading ? (
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
  );
}