import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import WeatherForm from "../src/app/Components/WeatherForm/WeatherForm.jsx";
//import { fireEvent } from "@testing-library/jest-dom/extend-expect";

test("renders input field with placeholder", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter city name");
  expect(input).toBeInTheDocument();
});

test("updates city value on input change", () => {
  const { getByPlaceholderText } = render(<WeatherForm />);
  const input = getByPlaceholderText("Enter city name");
  fireEvent.change(input, { target: { value: "New York" } });
  expect(input.value).toBe("New York");
});
