function displayTemp(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  let descriptionElemet = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElemet.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
}

let apiKey = "3f867b81a453d2baod0689b610fta810";
let city = "Copenhagen";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
