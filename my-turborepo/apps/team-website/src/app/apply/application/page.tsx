import { Suspense } from "react";
import { redirect } from "next/navigation";

import { areApplicationsOpen } from "@vanni/validators";

import { ApplicationForm } from "~/app/apply/application/application-form";
import { EVENT_NAME } from "~/lib/event-name";
import { api } from "~/trpc/server";
import styles from "./application.module.css";

export default async function Page() {
  const [event, application] = await Promise.all([
    api.event.findByName(EVENT_NAME),
    api.application.getApplicationStatus({ eventName: EVENT_NAME }),
  ]);

  const open = event ? areApplicationsOpen(event.extendedDeadline) : false;

  // Once applications close there is nothing to fill in, only something to
  // look at, so people who never applied go back to the dashboard.
  if (!open && !application) {
    redirect("/apply");
  }

  return (
    <>
      <div className={styles.page}>
        <Suspense
          fallback={<p className={styles.loading}>Loading... please wait</p>}
        >
          <ApplicationForm readOnly={!open} />
        </Suspense>
      </div>
    </>
  );
}
