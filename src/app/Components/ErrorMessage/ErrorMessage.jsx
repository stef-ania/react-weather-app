import React from "react";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red" }}>
      <p>Error: {message}</p>
    </div>
  );
}
