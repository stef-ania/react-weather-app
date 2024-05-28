// utils/dateUtils.js
import moment from "moment";

export function getCurrentDayAndTime() {
  const currentDateTime = moment();
  const currentDay = currentDateTime.format("dddd");
  const currentTime = currentDateTime.format("LT");
  return { currentDay, currentTime };
}

export function getTomorrow() {
  const tomorrow = moment().add(1, "day");
  return tomorrow.format("dddd");
}

export function getNextSixDays() {
  const nextSixDays = [];
  for (let i = 1; i <= 6; i++) {
    const nextDay = moment().add(i, "day");
    nextSixDays.push(nextDay.format("dddd"));
  }
  return nextSixDays;
}

export function formatUnixTimestamp(unixTimestamp) {
  return moment.unix(unixTimestamp).format("dddd");
}
