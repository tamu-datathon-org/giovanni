import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ApplicationForm } from "~/app/apply/application/application-form";
import { kodeMono } from "~/app/_components/fonts";
import styles from "./application.module.css";
import { appsOpen } from "../page";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!appsOpen) {
    redirect("/apply");
  }

  return (
    <>
      <div className={`${kodeMono.className} ${styles.page}`}>
        <Suspense
          fallback={<p className={styles.loading}>Loading... please wait</p>}
        >
          <ApplicationForm />
        </Suspense>
      </div>
    </>
  );
}
