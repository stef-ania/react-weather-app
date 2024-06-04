import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Project{" "}
      <a href="https://github.com/stef-ania/react-weather-app" target="_blank">
        open-sourced on GitHub
      </a>{" "}
      by{" "}
      <a href="https://github.com/stef-ania/" target="_blank">
        Stef
      </a>
    </footer>
  );
}
