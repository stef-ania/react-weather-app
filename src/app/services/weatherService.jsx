import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const APP_ID = "f4d1475cfe015c4c50b2300aa82dd590";

// export const search = (city, handleResponse) => {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric`;
//   axios.get(apiUrl).then(handleResponse);
// };

export const search = () => {
  const getWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APP_ID}&units=metric`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw new Error("Error fetching weather data:", error);
    }
  };

  return {
    getWeather,
  };
};

// export const weatherService = () => {
//   const getWeather = async (city) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APP_ID}&units=metric`;
//     const response = await axios.get(url);
//     return response;
//   };

//   return {
//     getWeather,
//   };
// };

export const weatherServiceForecast = () => {
  const getWeatherForecast = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APP_ID}&units=metric`;
    const response = await axios.get(url);
    return response;
  };

  return {
    getWeatherForecast,
  };
};
