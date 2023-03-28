// Define variables to store DOM elements
var cityNameEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var weatherInfoColumnsEl = document.querySelector("#weather-info-columns");
var weatherSummaryEl = document.querySelector("#weather-summary");
var weatherContainerEl = document.querySelector("#weather-container");
var cityFormHistoryEl = document.querySelector('#city-form-history')

var cityLat;
var cityLon;



// Define variable to store API key
var APIKey = "a6bc9930ce925bdcad061b78a447a8df"
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}"


// Define function to retrieve and display weather information
var formSubmitHandler = function (event){
    event.preventDefault();
    var city = cityNameEl.value.trim();

    if (city) {
       
        // Clear search input area, weather summary and weather container elements after clicking search button
        cityNameEl.value = '';
        weatherSummaryEl.innerHTML = '';
        weatherContainerEl.innerHTML = '';
        weatherInfoColumnsEl.innerHTML = '';

        getWeatherAPI(city);
        
    } else {
        alert('Please enter the city name');
    }
}


// Define function to handle click event on search history button
var searchHistoryClickHandler = function(event) {
  event.preventDefault();
  var cityName = event.target.textContent;
  getWeatherAPI(cityName);
};

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

              //create search history button
              createSearchHistoryButtons(data.city.name);

              //show the recent city name has been serached
              var nameOfCity = document.createElement("h3");
              nameOfCity.textContent = data.city.name;
              console.log(nameOfCity);
              weatherSummaryEl.appendChild(nameOfCity);


              //show the current date
              var todayEl = document.createElement("h3");
              todayEl.textContent = dayjs().format("DD/MM/YYYY");
              console.log(todayEl);
              weatherSummaryEl.append(todayEl);

              var currentWeather = data.list[0];

              // icon for the current weather forcast
              var currentWeatherIconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png"
              var currentWeatherIconEl = document.createElement("img");
              currentWeatherIconEl.setAttribute("src", currentWeatherIconUrl);
              weatherSummaryEl.append(currentWeatherIconEl);

              //console.log for current Weather info
              console.log("humidity:",currentWeather.main.humidity);
              console.log("weather:",currentWeather.weather[0].description);
              console.log("temp:",currentWeather.main.temp);

          
              // Create list items without bullet points
              var humidityListItem = document.createElement("li");
              humidityListItem.textContent = "Humidity: " + currentWeather.main.humidity;
              var weatherListItem = document.createElement("li");
              weatherListItem.textContent = "Weather: " + currentWeather.weather[0].description;
              var tempListItem = document.createElement("li");
              tempListItem.textContent = "Temperature: " + (parseFloat(currentWeather.main.temp -273.15).toFixed(2)) + " °C";
              var windSpeedItem = document.createElement("li");
              windSpeedItem.textContent = "Wind Speed: " + currentWeather.wind.speed;

              // Create unordered list element to hold list items
              var currentWeatherList = document.createElement("ul");
              currentWeatherList.classList.add("weather-list");

              // Append list items to unordered list element
              currentWeatherList.appendChild(humidityListItem);
              currentWeatherList.appendChild(weatherListItem);
              currentWeatherList.appendChild(tempListItem);
              currentWeatherList.appendChild(windSpeedItem);

              // Append unordered list element to weather container element
              weatherContainerEl.appendChild(currentWeatherList);


              //get lat and lon for the city to be used for five Day Weather Forcast
              cityLat = data.city.coord.lat
              cityLon = data.city.coord.lon
              
              console.log(cityLat);
              console.log(cityLon);

              //fetch the 5 day weather forcast url

              fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey)
              .then(function (response) {
              if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                console.log(data);
              })
              }
              });
            });

          } else {
            alert('Error: ' + response.statusText);
          }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeatherAPI');
    });
};

// Define function to handle click event on search history button
var createSearchHistoryButtons = function(city) {
  var buttonEl = document.createElement('button');
    buttonEl.setAttribute('type', 'submit');
    buttonEl.setAttribute('class', 'btn btn-info mt-4');
    buttonEl.textContent = city;
    buttonEl.addEventListener('click', searchHistoryClickHandler);
    cityFormHistoryEl.appendChild(buttonEl);
  
};


cityFormEl.addEventListener("submit",formSubmitHandler);