const apiKey = '712377fd43d6da24398f8076f733f79a';
let searchHistory = [];

function loadDefaultWeather() {
    document.getElementById('cityInput').value = "";
    getWeather('London');
}

function getWeather(city) {
    const inputCity = city || document.getElementById('cityInput').value;
    const unit = document.getElementById('unitSelect').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=${apiKey}&units=${unit}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                showError("City not found!");
                return;
            }
            hideError();
            addToSearchHistory(inputCity);
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            showError("Failed to fetch weather data. Please check your internet connection.");
        });
}

function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    cityName.textContent = data.city.name;

    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    const unit = document.getElementById('unitSelect').value;
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    for (let i = 0; i < data.list.length; i += 8) {
        const dayData = data.list[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        const tempMin = dayData.main.temp_min;
        const tempMax = dayData.main.temp_max;
        const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';

        forecastDay.innerHTML = `
            <h3>${date}</h3>
            <img src="${weatherIcon}" class="weather-icon" alt="Weather icon">
            <p>Min: ${tempMin.toFixed(1)}${unitSymbol}</p>
            <p>Max: ${tempMax.toFixed(1)}${unitSymbol}</p>
        `;

        forecastContainer.appendChild(forecastDay);
    }
}

function addToSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = '';
    searchHistory.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.onclick = () => {
            document.getElementById('cityInput').value = city;
            getWeather();
        };
        historyContainer.appendChild(button);
    });
}

function showError(message) {
    const errorContainer = document.getElementById('error-message');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

function hideError() {
    const errorContainer = document.getElementById('error-message');
    errorContainer.style.display = 'none';
}
