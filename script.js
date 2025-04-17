const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Function to fetch current weather
async function fetchCurrentWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Ville non trouvée');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Function to fetch forecast
async function fetchForecast(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Ville non trouvée');
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Function to update current weather display
function updateCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    document.getElementById('description').textContent = data.weather[0].description;
    
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;
}

// Function to update forecast display
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Get next 3 hours forecast
    const next3Hours = data.list.slice(0, 3);
    
    next3Hours.forEach(hour => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const time = new Date(hour.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit' });
        const temp = Math.round(hour.main.temp);
        const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
        
        card.innerHTML = `
            <div class="time">${time}</div>
            <img src="${iconUrl}" alt="${hour.weather[0].description}">
            <div class="temp">${temp}°C</div>
        `;
        
        forecastContainer.appendChild(card);
    });
}

// Function to handle search
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    try {
        const currentWeather = await fetchCurrentWeather(city);
        const forecast = await fetchForecast(city);
        
        updateCurrentWeather(currentWeather);
        updateForecast(forecast);
    } catch (error) {
        alert(error.message);
    }
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Load default city (Paris) on page load
window.addEventListener('load', () => {
    cityInput.value = 'Paris';
    handleSearch();
}); 