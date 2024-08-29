// NOTE: I couldn't get account linking to work as intended

// import { redirect } from "next/navigation";
//
// import { signIn } from "@vanni/auth";
//
// export const runtime = "edge";
//
// export default async function LinkPage() {
//   // You can await this here if you don't want to show Suspense fallback below
//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//         Link account
//       </h1>
//       <h2>Linked accounts:</h2>
//       <p>(insert accounts here)</p>
//       <h2>Link new account:</h2>
//       <p>
//         You can link new accounts with the button below. Please note that this
//         will sign you out.
//       </p>
//       <form>
//         <button
//           type="submit"
//           onClick={redirect("/dashboard/account/link/stage2")}
//         >
//           Link new account
//         </button>
//       </form>
//     </div>
//   );
// }
