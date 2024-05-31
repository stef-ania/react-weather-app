import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import WeatherForm from "../src/app/Components/WeatherForm/WeatherForm.jsx";

test("renders input field with placeholder", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter city name");
  expect(input).toBeDefined();
});

test("updates city value on input change", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter city name");
  fireEvent.change(input, { target: { value: "New York" } });
  expect(input.value).toBe("New York");
});

test("submits form when search button is clicked", () => {
  const { getByText } = render(<WeatherForm />);
  const submitButton = getByText("Search");
  fireEvent.click(submitButton);
});

test("displays weather information after form submission", async () => {
  const { getByText, getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter city name");
  fireEvent.change(input, { target: { value: "New York" } });
  const submitButton = getByText("Search");
  fireEvent.click(submitButton);
  // waitFor to wait for the weather data to be loaded:
  await waitFor(() => {
    expect(getByText("New York")).toBeDefined();
  });
});
