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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="forecast-wrapper">
      <div class="forecast">
        <span class="forecast-day">${formatDay(forecastDay.dt)}</span><br/>
        <div class="forecast-temp"><span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}&deg; </span>
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}&deg; </span></div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" class="icon"> 
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
}
function search(city) {
  let apikey = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(url).then(updateData);
}
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

search("Tehran");
