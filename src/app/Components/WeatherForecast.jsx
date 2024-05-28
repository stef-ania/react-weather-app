import React from "react";

export default function WeatherForecast({ forecast }) {
  return (
    <div>
      <h3>Weather Forecast for the Next 7 Days</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index}>
            <p>Day: {day.day}</p>
            <p>Max Temperature: {day.maxTemp}°C</p>
            <p>Min Temperature: {day.minTemp}°C</p>
            <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="Weather Icon" />
          </li>
        ))}
      </ul>
    </div>
  );
}
