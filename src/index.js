let apikey = "bfd67b65e01f8c3751ffb4a48f09d863";

let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[time.getDay()];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = day;

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);
function updateTime() {
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let clock = document.querySelector("#clock");
  clock.innerHTML = `${hour}:${minute}`;
}
function showCity(event) {
  event?.preventDefault();

  // currentCity.innerHTML = searchInput.value;

  let currentCity = document.querySelector("#current-city");
  let searchInput = document.querySelector("#search-input");
  updateTime();
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apikey}&units=metric`;
  axios.get(url).then(updateData);
}

function updateData(response) {
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let temperatureMax = Math.round(response.data.main.temp_max);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let humidityStatus = document.querySelector("#humidity-status");
  humidityStatus.innerHTML = `Humidity:${humidity}%`;
  let windStatus = document.querySelector("#wind-status");
  windStatus.innerHTML = `Wind:${wind}mph`;
  let condition = document.querySelector("#condition");
  condition.innerHTML = `${description}`;
  let limitationFirst = document.querySelector("#limitation-h");
  limitationFirst.innerHTML = `H:${temperatureMax}°`;
  let limitationSecond = document.querySelector("#limitation-l");
  limitationSecond.innerHTML = `L:${temperatureMin}°`;
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = `${temperature}°c`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityName;
}

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  updateTime();
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
  axios.get(url).then(updateData);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
getCurrentLocation();
