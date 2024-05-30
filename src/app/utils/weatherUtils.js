import { getCurrentDayAndTime, formatUnixTimestamp } from "./dateUtils";

export function extractWeatherData(weatherResponse) {
  const data = weatherResponse.data;
  const currentTemperature = Math.round(data.main.temp);
  const weatherDescription = data.weather[0].description;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const weatherIcon = data.weather[0].icon;
  const { currentDay, currentTime } = getCurrentDayAndTime();

  return {
    city: data.name,
    temperature: currentTemperature,
    description: weatherDescription,
    humidity,
    wind,
    day: currentDay,
    time: currentTime,
    icon: weatherIcon,
  };
}

export function extractForecastData(forecastResponse) {
  const data = forecastResponse.data;
  const forecastList = data?.list || [];

  return forecastList.reduce((acc, item) => {
    const day = formatUnixTimestamp(item.dt);
    const existingDay = acc.find((forecastDay) => forecastDay.day === day);

    if (!existingDay) {
      acc.push({
        day: day,
        maxTemp: Math.round(item.main.temp_max),
        minTemp: Math.round(item.main.temp_min),
        icon: item.weather[0].icon,
      });
    } else {
      if (Math.round(item.main.temp_max) > existingDay.maxTemp) {
        existingDay.maxTemp = Math.round(item.main.temp_max);
      }
      if (Math.round(item.main.temp_min) < existingDay.minTemp) {
        existingDay.minTemp = Math.round(item.main.temp_min);
      }
    }

    return acc.length === 7 ? acc : acc;
  }, []);
}
