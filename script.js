// API Key: ae4a8364aece4372a7551536242309
const apiKey = 'ae4a8364aece4372a7551536242309'; // WeatherAPI key

// Fetch Current Weather
async function fetchCurrentWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        document.getElementById('weather-data').innerHTML = `
            <p class="text-danger">Error fetching current weather. Please try with proper city name.</p>`;
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('weather-data');
    weatherContainer.innerHTML = `
        <div class="card col-md-4">
            <div class="card-body">
                <h5 class="card-title">${data.location.name}, ${data.location.country}</h5>
                <img class="card-img-top" src="https:${data.current.condition.icon}" alt="Weather icon">
                <h3 class="card-text"> ${data.current.temp_c}°C </h3>
                <p class="card-text"> Condition: ${data.current.condition.text}</p>
                <p class="card-text">Humidity: ${data.current.humidity}%</p>
                <p class="card-text">Wind: ${data.current.wind_kph} kph</p>
            </div>
        </div>
    `;
}

// Fetch Weather Forecast
async function fetchForecast() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        document.getElementById('weather-data').innerHTML = `
            <p class="text-danger">Error fetching forecast. Please try with proper city name.</p>`;
    }
}

// Display Weather Forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-data');
    let forecastHTML = '';

    data.forecast.forecastday.forEach(day => {
        forecastHTML += `
            <div class="card col-md-2">
                <div class="card-body">
                    <h5 class="card-title">${day.date}</h5>
                    <img class="card-img-top" src="https:${day.day.condition.icon}" alt="Weather icon">
                    <h3 class="card-text"> ${day.day.avgtemp_c}°C </h3>
                    <p class="card-text"><b>${day.day.condition.text}</b></p>
                    <p class="card-text"> Max Temp. ${day.day.maxtemp_c}°C </p>
                    <p class="card-text"> Min Temp. ${day.day.mintemp_c}°C </p>
                </div>
            </div>
        `;
    });

    forecastContainer.innerHTML = forecastHTML;
}
