import React from "react";
import styles from "./WeatherForecast.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export default function WeatherForecast({ forecast }) {
  return (
    <div className={styles.forecastWrapper}>
      <h3>Weather Forecast for the Next 7 Days</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index}>
            <p>Day: {day.day}</p>
            <p>Max Temperature: {day.maxTemp}°C</p>
            <p>Min Temperature: {day.minTemp}°C</p>
            <WeatherIcon code={day.icon} alt={day.description} />
            {/* <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="Weather Icon" />*/}
          </li>
        ))}
      </ul>
    </div>
  );
}
