import Link from "next/link";

export default function Page() {
  // TODO: Replace this with an API call to the correct router
  const appStatus = "pending";

  // TODO: Replace this variable with an api route that checks the latest event
  const appsOpen = false;
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
          <div className="dashboardText">APPLICATION STATUS:</div>
          <div className="dashStatus">{appStatus.toUpperCase()}</div>

          {appsOpen ? <AppsOpenMessage /> : <AppsClosedMessage />}
        </form>
      </div>
    </>
  );
}

function AppsClosedMessage() {
  return (
    <div className="dashboardText">
      <br />
      Applications are currently closed.
      <br />
      We are currently reviewing applications.
      <br />
      Keep an eye out for an email!
    </div>
  );
}

function AppsOpenMessage() {
  return (
    <button className="editButton">
      <Link className="dashboardText buttonText" href="/apply/application">
        Edit your application
      </Link>
    </button>
  );
}
