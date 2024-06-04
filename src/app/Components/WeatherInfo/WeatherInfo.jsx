import React from "react";
import styles from "./WeatherInfo.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function WeatherInfo({ city, temperature, description, humidity, wind, day, time, icon }) {
  return (
    <div className={styles.weatherInfoWrapper}>
      <div className={styles.weatherMainInfo}>
        <h1>{city}</h1>
        <p>
          {day} {time}, {description}
        </p>
        <p>
          Humidity: <strong className={styles.weatherAccent}>{humidity}%</strong>, Wind:{" "}
          <strong className={styles.weatherAccent}>{wind}km/h</strong>
        </p>
      </div>
      <div className={styles.weatherMainTemperature}>
        <WeatherIcon code={icon} alt={description} /> <span>{temperature}°C</span>
      </div>
    </div>
  );
}
