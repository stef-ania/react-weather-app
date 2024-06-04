"use client";
import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { weatherServiceCurrentDay, weatherServiceForecast } from "../../services/weatherService";
import WeatherInfo from "../WeatherInfo/WeatherInfo.jsx";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { extractWeatherData, extractForecastData } from "../../utils/weatherUtils";
import styles from "./WeatherForm.module.css";

const DEFAULT_CITY = "Barcelona";

export default function WeatherForm() {
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
    const service = weatherServiceCurrentDay();
    const response = await service.getWeather(city);
    return response;
  }

  async function getWeatherForecast(city) {
    // Obtener la longitud y latitud de la respuesta del servicio weatherServiceCurrentDay
    const currentDayResponse = await getWeather(city);
    const { coord } = currentDayResponse.data;
    const { lat, lon } = coord;

    //Llamamos al servicio:
    const serviceForecast = weatherServiceForecast();
    const response = await serviceForecast.getWeatherForecast(lat, lon);
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
    <>
      <form onSubmit={handleSubmit} className={styles.weatherForm}>
        <input type="search" className={styles.searchInput} placeholder="Enter city name" onChange={updateCity} />
        <input type="submit" value="Search" className={styles.submitInput} />
      </form>
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
    </>
  );
}
