import styles from "./page.module.css";
import WeatherForm from "./Components/WeatherForm/WeatherForm.jsx";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <WeatherForm />
      </main>
      <Footer />
    </div>
  );
}
