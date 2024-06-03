import React from "react";
import styles from "./WeatherInfo.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import dateUtils from "../../utils/dateUtils";

export default function WeatherInfo({ city, temperature, description, humidity, wind, day, time, icon }) {
  return (
    <div className={styles.weatherInfoWrapper}>
      <h3>{city}</h3>
      <p>{temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind}km/h</p>
      <p>Day: {day}</p>
      <p>Time: {time}</p>
      <WeatherIcon code={icon} alt={description} />
    </div>
  );
}
