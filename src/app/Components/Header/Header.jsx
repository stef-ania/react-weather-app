import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <h2 className={styles.logo}>☂️ Meteofy</h2>
    </header>
  );
}
