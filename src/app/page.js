import Image from "next/image";
import styles from "./page.module.css";
import WeatherSearchBar from "./Components/WeatherSearchBar.jsx";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <WeatherSearchBar />
      </main>
      <Footer />
    </>
  );
}
