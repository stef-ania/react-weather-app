"use client";
import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { weather_api } from "../services/weather_api";
import { getCurrentDayAndTime } from "../utils/dateUtils";
import WeatherInfo from "./WeatherInfo";

export default function SearchEngine() {
  const [formData, setFormData] = useState({
    city: "Barcelona",
    weather: null,
    loading: false,
    submitted: false,
  });

  useEffect(() => {
    fetchWeather("Barcelona");
  }, []);

  function fetchWeather(city) {
    const service = weather_api();

    setFormData({
      ...formData,
      loading: true,
    });

    service
      .getWeather(city)
      .then((response) => {
        const currentTemperature = Math.round(response.data.main.temp);
        const weatherDescription = response.data.weather[0].description;
        const humidity = response.data.main.humidity;
        const wind = response.data.wind.speed;
        const weatherIcon = response.data.weather[0].icon;
        const { currentDay, currentTime } = getCurrentDayAndTime();

        const weatherData = {
          city,
          temperature: currentTemperature,
          description: weatherDescription,
          humidity,
          wind,
          day: currentDay,
          time: currentTime,
          icon: weatherIcon,
        };

        setFormData({
          ...formData,
          weather: weatherData,
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
      {formData.submitted && !formData.loading && formData.weather && <WeatherInfo {...formData.weather} />}
    </form>
  );
}
