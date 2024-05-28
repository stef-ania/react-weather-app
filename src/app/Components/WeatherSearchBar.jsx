"use client";
import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { weather_api } from "../services/weather_api";
import { getCurrentDayAndTime, getTomorrow, getNextSixDays } from "../utils/dateUtils";

export default function SearchEngine() {
  const [formData, setFormData] = useState({
    city: "",
    messages: [],
    loading: false,
    submitted: false,
  });

  useEffect(() => {
    const { currentDay, currentTime } = getCurrentDayAndTime();
    console.log("Current Day:", currentDay);
    console.log("Current Time:", currentTime);

    const tomorrow = getTomorrow();
    console.log("Tomorrow:", tomorrow);

    const nextSixDays = getNextSixDays();
    console.log("Next 6 Days:", nextSixDays);
  }, []);

  function fetchWeather(city) {
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

        setFormData({
          ...formData,
          messages: newMessages,
          loading: false,
          submitted: true,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setFormData({
          ...formData,
          loading: false,
          submitted: true,
        });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      loading: true,
    });
    fetchWeather(formData.city);
  }

  function updateCity(event) {
    setFormData({
      ...formData,
      city: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter city name" onChange={updateCity} />
      <input type="submit" value="Search" />
      {formData.loading && (
        <TailSpin
          visible={true}
          height={80}
          width={80}
          color="blue"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {formData.submitted && !formData.loading && (
        <ul>
          {formData.messages.map((message, index) => (
            <li key={index}>
              {index === 4 ? (
                <img src={`http://openweathermap.org/img/wn/${message}.png`} alt="Weather Icon" />
              ) : (
                message
              )}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
