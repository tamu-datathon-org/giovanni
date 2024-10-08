import Link from "next/link";
import { redirect } from "next/navigation";

import IconList from "../_components/IconList";

export default function Page() {
  redirect("/apply/application");
  return (
    <>
      {/* <IconList /> */}
      <div className="mainContent">
        <h1>DASHBOARD</h1>

        <form
          className="vertical boxShadowContainer"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "75vw",
            padding: "10px",
          }}
        >
          {/* <div className="dashboardText">APPLICATION STATUS:</div>
          <div className="dashStatus">{appStatus.toUpperCase()}</div>

          <div className="dashboardText">
            <br />
            Applications are currently closed.
            <br />
            We are currently reviewing applications.
            <br />
            Keep an eye out for an email!
          </div>
          <button className="editButton">
            <Link
              className="dashboardText buttonText"
              href="/apply/application"
            >
              Edit your application
            </Link>
          </button> */}
        </form>
      </div>
    </>
  );
}
