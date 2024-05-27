import Image from "next/image";
import styles from "./page.module.css";
import WeatherSearchBar from "./Components/WeatherSearchBar.jsx";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>Holi!</div>
      <WeatherSearchBar />
    </main>
  );
}
