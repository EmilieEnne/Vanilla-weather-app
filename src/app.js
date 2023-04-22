function formatDate(timestamp) {
  let date = new Date(timestamp);
  let today = date.getDate();
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day} ${month} ${today}`;
}

function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  let descriptionElemet = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.temperature.current;
  let iconPic = response.data.condition.icon;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElemet.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `media/${iconPic}.png`);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function displayForecast() {
  forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3 this-day">
             <h3>${day}</h3>
             <p class="date">April 15th</p>
             <img src="media/few-clouds-day.png" alt="partly cloudy" />
             <h1>12°</h1>
           </div>
        `;
  });
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;

function handelSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayCelcTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenTemp = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemp);
}

let fahrenLink = document.querySelector("#fahren");
fahrenLink.addEventListener("click", displayFahrenTemp);

let celcLink = document.querySelector("#celc");
celcLink.addEventListener("click", displayCelcTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

function search(city) {
  let apiKey = "3f867b81a453d2baod0689b610fta810";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

displayForecast();
