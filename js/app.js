// *** VARIABLES ***
// Search
const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
// Results
const mainEl = document.getElementById("main");
// API key & URLs
const apiKey = "3265874a2c77ae4a04bb96236a642d2f";
const apiCurrentUrl = (locale) => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${apiKey}&units=metric`;
};
const apiForecastUrl = (locale) => {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${locale}&appid=${apiKey}&units=metric`;
};

// *** FUNCTIONS ***
// Get current weather data from API
async function getCurrentWeatherData(locale) {
  const response = await fetch(apiCurrentUrl(locale));

  const currentWeatherData = await response.json();
  console.log(currentWeatherData);

  addWeatherDataToUI(currentWeatherData);
}

// Get current weather data from API
async function getForecastWeatherData(locale) {
  const response = await fetch(apiForecastUrl(locale));

  const forecastWeatherData = await response.json();
  console.log(forecastWeatherData);

  addWeatherDataToUI(forecastWeatherData);
}

// Display weather data
function addWeatherDataToUI(data) {
  // Temperature
  const temp = Math.round(data.main.temp);
  const tempH = Math.round(data.main.temp_max);
  const tempL = Math.round(data.main.temp_min);

  // Rain
  const rain = () => {
    let rainfall;

    if (data.rain === undefined) {
      rainfall = 0;
    } else {
      let rainAmnt = data.rain["1h"];
      rainfall = Math.round(rainAmnt);
    }

    return rainfall;
  };

  // Wind
  const wind = () => {
    let windSpeed;

    if (data.wind.speed === undefined) {
      windSpeed = 0;
    } else {
      let speed = data.wind.speed;
      windSpeed = Math.round(speed);
    }

    return windSpeed;
  };

  const weather = document.createElement("div");
  weather.classList.add("results");

  weather.innerHTML = `
		<h3 class="location">${data.name}, ${data.sys.country}</h1>
		<img src="https://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png" class="conditions-img">
		<h1 class="current-temp">${temp}&#8451;</h1>
		<p class="high-low">H : ${tempH}&deg; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L : ${tempL}&deg;</p>
		<div class="additional-info">
			<p>Feels Like: ${Math.floor(data.main.feels_like)}&#8451;</p>
			<p>Humidity: ${data.main.humidity}%</p>
			<p>Wind: ${wind()}m/s</p>
			<p>Rain: ${rain()}mm</p>
		</div>
	`;

  // Clean up HTML
  main.innerHTML = "";
  // Display data to user interface
  main.appendChild(weather);
}

// *** EVENT LISTENERS ***
// On load
window.addEventListener("load", () => {
  const mostPopularCitiesInTheWorld = [
    "London",
    "Tokyo",
    "New York",
    "Paris",
    "Singapore",
    "Gaborone",
    "Bangkok",
    "Hong Kong",
    "Shanghai",
    "Barcelona",
    "Beijing",
    "Los Angeles",
    "Seoul",
    "Mexico City",
    "Moscow",
    "Sydney",
    "Mumbai",
    "Rome",
    "Dubai",
    "Berlin",
    "Madrid",
    "São Paulo",
    "Rio de Janeiro",
    "Delhi",
    "Durban",
    "Johannesburg",
    "Cairo",
    "Nairobi",
    "Victoria Falls",
  ];

  const randomNum = Math.floor(
    Math.random() * mostPopularCitiesInTheWorld.length
  );

  getCurrentWeatherData(mostPopularCitiesInTheWorld[randomNum]);
});

// Search button
btnSearch.addEventListener("click", () => {
  const locale = searchInput.value;

  if (locale) {
    getCurrentWeatherData(locale);
    getForecastWeatherData(locale);
  }
});
