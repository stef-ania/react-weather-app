import React from "react";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
    </div>
  );
}
