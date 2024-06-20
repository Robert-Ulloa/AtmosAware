const apiKey = '712377fd43d6da24398f8076f733f79a';

function loadDefaultWeather() {
    document.getElementById('cityInput').value = "london";
    getWeather();
}


function getWeather(){
    const city =
    document.getElementById('cityInput').value;
    const weatherUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
    .then(Response => Response.json())
    .then(data => {
        if(data.cod === "404"){
            alert("City not found!");
            return;
        }
        displayWeather(data);
    })
    .catch(error => {
        console.log("Error fetchin weathjer data:", error);
        alert("Failed to fetch weather data. Please check your internet connection.");

    });
}

function displayWeather(data) {

    const cityName = document.getElementById("cityName");
    cityName.textContent = data.city.name;

    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    for (let i = 0; i< data.list.length; i +=8) {
        const dayData = data.list(i);
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        const tempMin = dayData.main.temp_min;
        const tempMax = dayData.main.temp_max;
        const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';

        forecastDay.innerHTML =`
        <h3>${date}</h3>
        <img scr="${weatherIcon}" class="weather-icon" alt="weather icon".
        <p>Min: ${tempMin.toFixed(1)}°C</p>
        <p>Max: ${tempMin.toFixed(1)}°C</p>
        `;

        forecastContainer.appendChild(forecastDay);


    }
}

