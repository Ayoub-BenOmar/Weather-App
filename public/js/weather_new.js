const API_KEY = 'be5fde4a83acdcb49c3cffbba0c95be7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API key is set
if (!API_KEY) {
    alert('Veuillez configurer votre clé API OpenWeatherMap dans le fichier weather.js');
    throw new Error('API key not configured');
}

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Function to fetch current weather
async function fetchCurrentWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Ville non trouvée');
            } else if (response.status === 401) {
                throw new Error('Clé API invalide');
            } else {
                throw new Error('Erreur lors de la récupération des données météo');
            }
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Function to fetch forecast
async function fetchForecast(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Ville non trouvée');
            } else if (response.status === 401) {
                throw new Error('Clé API invalide');
            } else {
                throw new Error('Erreur lors de la récupération des prévisions');
            }
        }
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
        card.className = 'flex flex-col items-center bg-white rounded-xl p-4 min-w-[120px] shadow-sm';
        
        const time = new Date(hour.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit' });
        const temp = Math.round(hour.main.temp);
        const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;
        
        card.innerHTML = `
            <div class="font-semibold text-gray-800">${time}</div>
            <img src="${iconUrl}" alt="${hour.weather[0].description}" class="w-12 h-12 my-2">
            <div class="text-gray-600">${temp}°C</div>
        `;
        
        forecastContainer.appendChild(card);
    });
}

// Function to handle search
async function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Veuillez entrer le nom d\'une ville');
        return;
    }
    
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