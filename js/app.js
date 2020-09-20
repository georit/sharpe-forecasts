// *** VARIABLES ***
// Search
const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
// Results
const mainEl = document.getElementById("main");
// API key & URLs
const apiKey = "3265874a2c77ae4a04bb96236a642d2f";
const apiCurrentUrl = (locale) => {
	return `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${apiKey}&units=metric`
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
	const temp = Math.round(data.main.temp);
	const tempH = Math.round(data.main.temp_max);
	const tempL = Math.round(data.main.temp_min);
	
	const weather = document.createElement('div');
	weather.classList.add('results');
	
	weather.innerHTML = `
		<h3 class="location">${data.name}, ${data.sys.country}</h1>
		<h1 class="current-temp">${temp}&#8451;</h1>
		<p class="high-low">H:${tempH}&deg; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L:${tempL}&deg;</p>
	`;
	
	// Clean up HTML
	main.innerHTML = "";
	// Display data to user interface
	main.appendChild(weather);
}

// *** EVENT LISTENERS ***
// Search button
btnSearch.addEventListener("click", () => {
  const locale = searchInput.value;

  if (locale) {
    getCurrentWeatherData(locale);
    getForecastWeatherData(locale);
  }
});
