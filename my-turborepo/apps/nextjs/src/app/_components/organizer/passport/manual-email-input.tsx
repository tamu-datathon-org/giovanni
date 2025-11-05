import React, { type RefObject } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface ManualEmailInputProps {
  manualEmail: string;
  setManualEmail: (email: string) => void;
  handleSearch: () => void;
  handleClear: () => void;
  inputRef: RefObject<HTMLInputElement>;
  anyBlockingLoad: boolean;
  isPendingMutation: boolean;
  scannerEmail: string;
  submittedEmail: string;
  effectiveEmail: string;
}

export function ManualEmailInput({
  manualEmail,
  setManualEmail,
  handleSearch,
  handleClear,
  inputRef,
  anyBlockingLoad,
  isPendingMutation,
  scannerEmail,
  submittedEmail,
}: ManualEmailInputProps) {
  return (
    <div className="w-full text-center p-4">
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
          disabled={anyBlockingLoad || isPendingMutation}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="default"
            onClick={handleSearch}
            disabled={!manualEmail.trim() || anyBlockingLoad || isPendingMutation}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
            disabled={
              anyBlockingLoad ||
              isPendingMutation ||
              (!manualEmail && !scannerEmail && !submittedEmail)
            }
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}