// Define variables to store DOM elements
var cityNameEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var weatherInfoColumnsEl = document.querySelector("#weather-info-columns");
var weatherSummaryEl = document.querySelector("#weather-summary");
var WeatherContainerEl = document.querySelector("#weather-container");


// Define variable to store API key
var APIKey = "a6bc9930ce925bdcad061b78a447a8df"
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a6bc9930ce925bdcad061b78a447a8df}"


// Define function to retrieve and display weather information
var formSubmitHandler = function (event){
    event.preventDefault();
    var city = cityNameEl.value.trim();

    if (city) {
        getWeatherAPI(city);

        cityNameEl.value = '';
    } else {
        alert('Please enter the city name');
    }
}


var getWeatherAPI = function (cityInfo) {
    // Build URL for weather API
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInfo}&appid=${APIKey}`;

    // Send GET request to weather API
    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              //show the recent city name has been serached
              var nameOfCity = document.createElement("h3");
              nameOfCity.textContent = data.city.name;
              console.log(nameOfCity);
              weatherSummaryEl.appendChild(nameOfCity);
              //display current Weather info(data, cityInfo);
              var currentWeather = data.list[0];
              console.log("humidity:",currentWeather.main.humidity);
              console.log("weather:",currentWeather.weather[0].description);
              console.log("temp:",currentWeather.main.temp);

            });
          } else {
            alert('Error: ' + response.statusText);
          }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeatherAPI');
    });

    var displaySummary = function() {

    //show the current date
    var todayEl = document.createElement("h3");
    todayEl.textContent = dayjs().format("DD/MM/YYYY");
    console.log(todayEl);
    WeatherContainerEl.append(todayEl);

    

}
};








  cityFormEl.addEventListener("submit",formSubmitHandler);