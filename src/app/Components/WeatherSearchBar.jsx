"use client";
import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { weather_api, weather_api_forecast } from "../services/weather_api";
import { getCurrentDayAndTime, getNextSixDays, formatUnixTimestamp } from "../utils/dateUtils";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function SearchEngine() {
  const [formData, setFormData] = useState({
    city: "Barcelona",
    weather: null,
    forecast: null,
    loading: false,
    submitted: false,
  });

  useEffect(() => {
    fetchWeather("Barcelona");
  }, []);

  function fetchWeather(city) {
    const service = weather_api();
    const serviceForecast = weather_api_forecast();

    setFormData({
      ...formData,
      loading: true,
    });

    Promise.all([service.getWeather(city), serviceForecast.getWeatherForecast(city)])
      .then(([weatherResponse, forecastResponse]) => {
        const currentTemperature = Math.round(weatherResponse.data.main.temp);
        const weatherDescription = weatherResponse.data.weather[0].description;
        const humidity = weatherResponse.data.main.humidity;
        const wind = weatherResponse.data.wind.speed;
        const weatherIcon = weatherResponse.data.weather[0].icon;
        const { currentDay, currentTime } = getCurrentDayAndTime();
        const forecast =
          forecastResponse.data && forecastResponse.data.list && forecastResponse.data.list.length > 0
            ? forecastResponse.data.list.reduce((acc, item) => {
                const day = formatUnixTimestamp(item.dt);

                // Verificar si ya existe un pronóstico para este día
                const existingDay = acc.find((forecastDay) => forecastDay.day === day);

                // Si no existe, agregar un nuevo pronóstico para este día
                if (!existingDay) {
                  acc.push({
                    day: day,
                    maxTemp: Math.round(item.main.temp_max),
                    minTemp: Math.round(item.main.temp_min),
                    icon: item.weather[0].icon,
                  });
                } else {
                  // Si ya existe, actualizar las temperaturas máxima y mínima si son más altas o más bajas
                  if (Math.round(item.main.temp_max) > existingDay.maxTemp) {
                    existingDay.maxTemp = Math.round(item.main.temp_max);
                  }
                  if (Math.round(item.main.temp_min) < existingDay.minTemp) {
                    existingDay.minTemp = Math.round(item.main.temp_min);
                  }
                }

                // Verificar si ya se han agregado 7 días
                return acc.length === 7 ? acc : acc;
              }, [])
            : [];

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
