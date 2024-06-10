import React from "react";
import axios from "axios";
import { render, fireEvent, waitFor, screen, findByTestId } from "@testing-library/react";
import WeatherForm from "../src/app/Components/WeatherForm/WeatherForm.jsx";
import WeatherInfo from "../src/app/Components/WeatherInfo/WeatherInfo.jsx";

jest.mock("axios");

test("renders input field with placeholder", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter a city");
  expect(input).toBeDefined();
});

test("updates city value on input change", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter a city");
  fireEvent.change(input, { target: { value: "New York" } });
  expect(input.value).toBe("New York");
});

test("submits form and displays weather data", async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes("weather")) {
      return Promise.resolve({
        data: {
          coord: { lon: 2.159, lat: 41.3888 },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "scattered clouds",
              icon: "03d",
            },
          ],
          main: {
            temp: 20.24,
            feels_like: 20.33,
            temp_min: 18.6,
            temp_max: 22.64,
            pressure: 1013,
            humidity: 77,
          },
          name: "Barcelona",
          cod: 200,
        },
      });
    } else if (url.includes("forecast")) {
      return Promise.resolve({
        data: {
          list: [
            {
              dt: 1620838800,
              main: {
                temp: 21.53,
                feels_like: 21.7,
                temp_min: 20.95,
                temp_max: 21.53,
                pressure: 1012,
                sea_level: 1012,
                grnd_level: 1011,
                humidity: 88,
                temp_kf: 0.58,
              },
              weather: [
                {
                  id: 801,
                  main: "Clouds",
                  description: "few clouds",
                  icon: "02d",
                },
              ],
              clouds: { all: 20 },
              wind: { speed: 4.12, deg: 210 },
              visibility: 10000,
              pop: 0,
              sys: { pod: "d" },
              dt_txt: "2024-05-12 12:00:00",
            },
          ],
        },
      });
    }
  });

  render(<WeatherForm />);
  const input = screen.getByPlaceholderText("Enter a city");
  fireEvent.change(input, { target: { value: "Barcelona" } });
  const submitButton = screen.getByRole("button", { name: /Search/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    const weatherInfo = screen.getByText(/Barcelona/i);
    expect(weatherInfo).toBeInTheDocument();
  });
});
