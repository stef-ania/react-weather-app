"use client";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { weather_api } from "../services/weather_api";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const service = weather_api();

    service
      .getWeather(city)
      .then((response) => {
        const currentTemperature = Math.round(response.data.main.temp);
        const weatherDescription = response.data.weather[0].description;
        const humidity = response.data.main.humidity;
        const wind = response.data.wind.speed;
        const weatherIcon = response.data.weather[0].icon;

        const newMessages = [
          `It is currently ${currentTemperature}°C in ${city}`,
          `Description: ${weatherDescription}`,
          `Humidity: ${humidity}`,
          `Wind: ${wind}km/h`,
          `${weatherIcon}`,
        ];

        setMessages(newMessages);
        setLoading(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
        setSubmitted(true);
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter city name" onChange={updateCity} />
      <input type="submit" value="Search" />
      {loading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="violet"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : null}
      {submitted && !loading && (
        <ul>
          {messages.map((message, index) => [
            index === 4 ? (
              <li key={index}>
                <img src={`http://openweathermap.org/img/wn/${message}.png`} alt="Weather Icon" />
              </li>
            ) : (
              <li key={index}>{message}</li>
            ),
          ])}
        </ul>
      )}
    </form>
  );
}
