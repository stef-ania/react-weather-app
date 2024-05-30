"use client";
import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { weather_api, weather_api_forecast } from "../services/weather_api";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import { extractWeatherData, extractForecastData } from "../utils/weatherUtils";

const DEFAULT_CITY = "Barcelona";

export default function SearchEngine() {
  const [formData, setFormData] = useState({
    city: DEFAULT_CITY,
    weather: null,
    forecast: null,
    loading: false,
    submitted: false,
  });

  useEffect(() => {
    fetchWeather(formData.city);
  }, []);

  function fetchWeather(city) {
    setFormData({
      ...formData,
      loading: true,
    });

    Promise.all([getWeather(city), getWeatherForecast(city)])
      .then(([weatherResponse, forecastResponse]) => {
        const weatherData = extractWeatherData(weatherResponse);
        const forecast = extractForecastData(forecastResponse);

        setFormData({
          ...formData,
          weather: weatherData,
          forecast: forecast,
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

  async function getWeather(city) {
    const service = weather_api();
    const response = await service.getWeather(city);
    return response;
  }

  async function getWeatherForecast(city) {
    const serviceForecast = weather_api_forecast();
    const response = await serviceForecast.getWeatherForecast(city);
    return response;
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
          height={48}
          width={48}
          color="#333"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {formData.submitted && !formData.loading && formData.weather && (
        <>
          <WeatherInfo {...formData.weather} />
          {formData.forecast && <WeatherForecast forecast={formData.forecast} />}
        </>
      )}
    </form>
  );
}
