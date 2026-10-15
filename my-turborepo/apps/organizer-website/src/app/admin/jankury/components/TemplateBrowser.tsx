"use client";

import { useMemo, useState } from "react";

import { Button } from "@vanni/ui/button";

import { api } from "~/trpc/react";

const AUTOMATED_LABELS: Record<string, string> = {
  confirmation: "registration confirmation",
  accepted: "acceptance",
  rejected: "rejection",
  waitlisted: "waitlist",
};

/**
 * Browse the files in packages/api/src/emails/templates and preview any of
 * them, rendered exactly as they'd be sent, before loading one into the
 * composer.
 */
export default function TemplateBrowser({
  onUse,
}: {
  onUse: (template: { subject: string; html: string }) => void;
}) {
  const list = api.emailSending.listEmailTemplates.useQuery();
  const [pickedId, setPickedId] = useState<string | null>(null);

  const templates = useMemo(() => list.data ?? [], [list.data]);
  const firstId = templates.length > 0 ? templates[0].id : null;
  const selectedId: string | null = pickedId ?? firstId;
  const selectedMeta = templates.find((t) => t.id === selectedId);

  const preview = api.emailSending.getEmailTemplate.useQuery(
    { id: selectedId ?? "" },
    { enabled: selectedId !== null },
  );

  const byCategory = useMemo(() => {
    const groups = new Map<string, typeof templates>();
    for (const template of templates) {
      groups.set(template.category, [
        ...(groups.get(template.category) ?? []),
        template,
      ]);
    }
    return [...groups.entries()];
  }, [templates]);

  return (
    <div className="grid min-h-0 gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
      <nav
        aria-label="Email template files"
        className="max-h-[28vh] overflow-auto rounded-md border border-gray-600 bg-gray-900 p-2 md:max-h-[70vh]"
      >
        {list.isLoading && (
          <p className="p-2 text-sm text-gray-400">Loading templates...</p>
        )}
        {list.error && (
          <p className="p-2 text-sm text-red-400">{list.error.message}</p>
        )}
        {byCategory.map(([category, files]) => (
          <div key={category} className="mb-2 last:mb-0">
            <p className="px-2 py-1 font-mono text-xs text-gray-400">
              {category}/
            </p>
            {files.map((template) => {
              const isSelected = template.id === selectedId;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setPickedId(template.id)}
                  aria-current={isSelected}
                  className={`flex w-full items-center justify-between gap-2 rounded px-3 py-1.5 text-left font-mono text-sm transition ${
                    isSelected
                      ? "bg-blue-950/60 text-white ring-1 ring-blue-500"
                      : "text-gray-200 hover:bg-gray-700"
                  }`}
                >
                  <span>{template.version}/email.html</span>
                  {template.automatedAs && (
                    <span className="rounded-full bg-emerald-700 px-2 py-0.5 font-sans text-[10px] font-semibold text-white">
                      auto
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <section className="flex min-w-0 flex-col gap-3">
        {selectedMeta && (
          <div className="space-y-1 text-sm">
            <p className="break-all font-mono text-xs text-gray-400">
              {selectedMeta.id}/email.html
            </p>
            <p className="text-white">
              <span className="text-gray-400">Subject: </span>
              {selectedMeta.subject}
            </p>
            {selectedMeta.automatedAs && (
              <p className="text-xs text-emerald-400">
                Sent automatically as the{" "}
                {AUTOMATED_LABELS[selectedMeta.automatedAs] ??
                  selectedMeta.automatedAs}{" "}
                email.
              </p>
            )}
          </div>
        )}

        <div className="relative h-[45vh] overflow-hidden rounded-md bg-white md:h-[60vh]">
          {preview.data && (
            <iframe
              key={preview.data.id}
              title={`Preview of ${preview.data.id}`}
              className="h-full w-full"
              srcDoc={preview.data.html}
            />
          )}
          {(preview.isLoading || preview.isFetching) && (
            <p className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-gray-600">
              Loading preview...
            </p>
          )}
          {preview.error && (
            <p className="absolute inset-0 flex items-center justify-center p-4 text-sm text-red-600">
              {preview.error.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          disabled={!preview.data || preview.isFetching}
          onClick={() => preview.data && onUse(preview.data)}
          className="self-end rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
        >
          Use this template
        </Button>
      </section>
    </div>
  );
}
