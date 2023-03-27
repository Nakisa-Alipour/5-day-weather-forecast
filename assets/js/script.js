// Define variables to store DOM elements
var cityNameEl = $("#city-name");
var cityFormEl = $("#city-form");
var searchHistoryEl = $("search-history");
var weatherInfoColumnsEl = $("#weather-info-columns");
var weatherSummaryEl = $("#weather-summary");
var fiveDayWeatherContainerEl = $("#5days-weather-container");

// Define variable to store API key
var APIKey = "a6bc9930ce925bdcad061b78a447a8df"
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a6bc9930ce925bdcad061b78a447a8df}"


// Define function to retrieve and display weather information
function getWeatherInfo(cityName) 


// Build URL for weather API
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;