// *** VARIABLES ***
// Search
const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
const btnClearSearch = document.getElementById("btn-clear-search");
// Results
const mainEl = document.getElementById("main");
// API key & URLs
const apiKey = "3265874a2c77ae4a04bb96236a642d2f";
const apiCurrentUrl = (locale) => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${locale}&appid=${apiKey}&units=metric`;
};

// *** FUNCTIONS ***
// Get current weather data from API
async function getCurrentWeatherData(locale) {
  try {
    // Fetch data from API
    const response = await fetch(apiCurrentUrl(locale));
    // Convert data to JSON format
    const currentWeatherData = await response.json();

    // Inject data to user interface
    addWeatherDataToUI(currentWeatherData);
  } catch {
    mainEl.innerHTML = `
    <div class="no-results">
    <img class="no-results-img" src="./img/sad_face.png">
    <p>Sorry, there are no weather results for <span class="search-word">"${searchInput.value}"</span>. Try searching for a different location</p>
    </div>`;
  }
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
      rainfall = rainAmnt.toFixed(2);
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

  // Create a div to hold data
  const weather = document.createElement("div");
  // Add style to the div
  weather.classList.add("results");

  // Add weather data to the div
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
  mainEl.innerHTML = "";
  // Display data to user interface
  mainEl.appendChild(weather);
}

// Display weather info for random city
function getRandomCityWeather() {
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
    "Hanoi",
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
}

// Show clear search button
function showBtnClearSearch() {
  btnClearSearch.classList.add("show-btn-clear-search");
}

// Hide clear search button
function HideBtnClearSearch() {
  btnClearSearch.classList.remove("show-btn-clear-search");
}

// Show/hide clear search button based on whether user has typed in something or not
function userTypedSomething () {
  let searchTerm = searchInput.value;
  
  if (searchTerm.length > 0) {
    showBtnClearSearch();
  } else {
    HideBtnClearSearch();
  }
}

// Submit search 
function submitSearchTerm () {
  // Hide clear search button
  HideBtnClearSearch();
  
  // Clear html
  mainEl.innerHTML = "";
  
  // Get weather data
  const locale = searchInput.value;
  if (locale) {
    getCurrentWeatherData(locale);
  } else {
    mainEl.innerHTML = `<p class="no-text-entered">No text entered, please search for a location.<p>`;
  }
}

// *** EVENT LISTENERS ***
// On load
window.addEventListener("load", getRandomCityWeather);

// Search button
btnSearch.addEventListener("click", () => {
  submitSearchTerm();
});

// Search input
searchInput.addEventListener("focusin", () => {
  userTypedSomething();
});

searchInput.addEventListener("focusout", () => {
  HideBtnClearSearch();
});

searchInput.addEventListener("keyup", (e) => {
  if (e.code === 'Enter') {
    submitSearchTerm();
  } else { 
  userTypedSomething();
  }
});

// Clear search button
btnClearSearch.addEventListener("click", () => {
  searchInput.value = "";
  HideBtnClearSearch();
});
