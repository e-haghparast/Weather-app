"use strict";
let apikey = "bfd67b65e01f8c3751ffb4a48f09d863";
function FormatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function showCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchInput = document.querySelector("#search-input");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apikey}&units=metric`;
  axios.get(url).then(updateData);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function updateData(response) {
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temperatureMax = Math.round(response.data.main.temp_max);
  let temperatureMin = Math.round(response.data.main.temp_min);
  document.querySelector("#current-city").innerHTML = cityName;
  document.querySelector(
    "#humidity-status"
  ).innerHTML = `Humidity:${humidity}%`;
  document.querySelector("#wind-status").innerHTML = `Wind:${wind}mph`;
  document.querySelector("#date").innerHTML = FormatDate(
    response.data.dt * 1000
  );
  document.querySelector("#description").innerHTML = `${condition}`;
  document.querySelector("#limitation-h").innerHTML = `H:${temperatureMax}°`;
  document.querySelector("#limitation-l").innerHTML = `L:${temperatureMin}°`;
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  axios.get(url).then(updateData);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
getCurrentLocation();
