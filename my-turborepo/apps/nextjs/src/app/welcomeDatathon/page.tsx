import IconList from "../_components/IconList"; // Import the 'IconList' component and its props type
import { CreatePreregistrationForm } from "../_components/preregistration-form";
import styles from "./page.module.css"; // Import the CSS module for styling

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.animatedText}>Welcome to Datathon</h1>
    </div>
  );
}
