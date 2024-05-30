import Image from "next/image";
import styles from "./page.module.css";
import WeatherForm from "./Components/WeatherForm/WeatherForm.jsx";
import Footer from "./Components/Footer/Footer.jsx";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <WeatherForm />
      </main>
      <Footer />
    </>
  );
}
