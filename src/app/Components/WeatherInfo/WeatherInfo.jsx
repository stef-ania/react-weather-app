import React from "react";
import styles from "./WeatherInfo.module.css";

export default function WeatherInfo({ city, temperature, description, humidity, wind, day, time, icon }) {
  return (
    <div className={styles.weatherInfoWrapper}>
      <p>{city}</p>
      <p>{temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind}km/h</p>
      <p>Day: {day}</p>
      <p>Time: {time}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" />
    </div>
  );
}
