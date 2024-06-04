import React from "react";
import styles from "./WeatherForecast.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function WeatherForecast({ forecast }) {
  return (
    <div className={styles.forecastWrapper}>
      <ul className={styles.forecastList}>
        {forecast.map((day, index) => (
          <li key={index}>
            <p className={styles.forecastDay}>{day.day}</p>
            <WeatherIcon code={day.icon} alt={day.description} />
            <p className={styles.forecastMinMax}>
              <span className={styles.forecastMax}> {day.maxTemp}°</span>{" "}
              <span className={styles.forecastMin}>{day.minTemp}°</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
