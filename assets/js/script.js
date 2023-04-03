// Define variables to store DOM elements
var cityNameEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var weatherInfoColumnsEl = document.querySelector("#weather-info-columns");
var weatherSummaryEl = document.querySelector("#weather-summary");
var weatherContainerEl = document.querySelector("#weather-container");
var cityFormHistoryEl = document.querySelector('#city-form-history');
var existingButtons = document.querySelectorAll('button');
var weatherForecast = document.querySelector("#weather-forecast");

var cityLat;
var cityLon;
var cityArray = [];
var uniqueArray;


// Define variable to store API key
var APIKey = "a6bc9930ce925bdcad061b78a447a8df"
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}"

// Define function to retrieve and display weather information
var formSubmitHandler = function (event){
    event.preventDefault();
    var city1 = cityNameEl.value.trim();
    var city = city1.toLowerCase();

    if (city) {
       
        // Clear search input area, weather summary and weather container elements after clicking search button
        cityNameEl.value = '';
        weatherSummaryEl.innerHTML = '';
        weatherContainerEl.innerHTML = '';
        weatherInfoColumnsEl.innerHTML = '';
        cityFormHistoryEl.innerHTML = '';

        // make an array of searched city
        cityArray.push(city);
        console.log(cityArray);

        //ensure the city name is not repeating in the array
        uniqueArray = [...new Set(cityArray)];
        console.log(uniqueArray);
        localStorage.setItem('searched-cities', JSON.stringify(uniqueArray));

        //make button for cities listed in the array
        for ( i = 0; i < uniqueArray.length; i++) {
          var getArray = JSON.parse(localStorage.getItem('searched-cities') || '[]');
          console.log(getArray)
          createSearchHistoryButtons(getArray[i]);
        }

        getWeatherAPI(city);
        
    } else {
        alert('Please enter the city name');
    }
}

// Define function to handle click event on search history button
var searchHistoryClickHandler = function(event) {
  event.preventDefault();
  var cityName = event.target.textContent;

  cityNameEl.value = '';
  weatherSummaryEl.innerHTML = '';
  weatherContainerEl.innerHTML = '';
  weatherInfoColumnsEl.innerHTML = '';

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

          
              // Create list items with bullet points
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

                for ( i = 0 ; i <40; i+=8){
                  // convert Unix timestamp to specific format
                  var cardSection = document.createElement("div");
                  cardSection.classList = "card";
                  cardSection.style.boxShadow = "10px 20px 30px gray";
                  var cardHeader =  document.createElement("div");
                  cardHeader.classList = "card-header"
                  var unixFormat = dayjs.unix(data.list[i].dt).format('MMM D, YYYY');
                  var convertedDateItem = document.createElement("h5");
                  convertedDateItem.textContent = "Date: " + unixFormat;
                  
                  

                  // weather icon
                  var weatherForcasteIconUrl = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"
                  var weatherForcasteIconEl = document.createElement("img");
                  weatherForcasteIconEl.setAttribute("src", weatherForcasteIconUrl);
                  
                  
                  // Create list items with bullet points
                  var humidityForecastItem = document.createElement("li");
                  humidityForecastItem.textContent = "Humidity: " + data.list[i].main.humidity;
                  var weatherForecastItem = document.createElement("li");
                  weatherForecastItem.textContent = "Weather: " + data.list[i].weather[0].description;
                  var tempForecastItem = document.createElement("li");
                  tempForecastItem.textContent = "Temperature: " + (parseFloat(data.list[i].main.temp -273.15).toFixed(2)) + " °C";
                  var windSpeedForecastItem = document.createElement("li");
                  windSpeedForecastItem.textContent = "Wind Speed: " + data.list[i].wind.speed;

                  // Create unordered list element to hold list items
                  var weatherForcasteList = document.createElement("ul");
                  //weatherInfoColumnsEl.classList.add("weather-list");

                  // Append list items to unordered list element
                  cardHeader.appendChild(convertedDateItem);
                  cardHeader.appendChild(weatherForcasteIconEl);
                  cardSection.appendChild(cardHeader);
                  weatherForcasteList.appendChild(humidityForecastItem);
                  weatherForcasteList.appendChild(weatherForecastItem);
                  weatherForcasteList.appendChild(tempForecastItem);
                  weatherForcasteList.appendChild(windSpeedForecastItem);
                  cardSection.appendChild(weatherForcasteList);
                  

                  // Append unordered list element to weather container element
                  //weatherForcasteList.append(weatherInfoColumnsEl);
                  weatherInfoColumnsEl.appendChild(cardSection);

                }

                
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
