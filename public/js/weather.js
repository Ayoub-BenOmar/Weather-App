const API_KEY = 'be5fde4a83acdcb49c3cffbba0c95be7';
const BASE_URL = 'https://api.openweathermap.org/data/3.0';

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
        // First get coordinates
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        if (!geoResponse.ok) {
            if (geoResponse.status === 401) {
                throw new Error('Clé API invalide ou pas encore activée (délai jusqu\'à 2 heures)');
            }
            throw new Error('Ville non trouvée');
        }
        const geoData = await geoResponse.json();
        if (!geoData.length) {
            throw new Error('Ville non trouvée');
        }

        const { lat, lon } = geoData[0];
        const response = await fetch(`${BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Clé API invalide ou pas encore activée (délai jusqu\'à 2 heures)');
            }
            throw new Error('Erreur lors de la récupération des données météo');
        }
        const data = await response.json();
        return {
            ...data,
            name: geoData[0].name // Add city name to the response
        };
    } catch (error) {
        throw error;
    }
}

// Function to update current weather display
function updateCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temp').textContent = Math.round(data.current.temp);
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('wind').textContent = Math.round(data.current.wind_speed * 3.6); // Convert m/s to km/h
    document.getElementById('description').textContent = data.current.weather[0].description;
    
    const iconUrl = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;

    // Update forecast using hourly data
    updateForecast(data);
}

// Function to update forecast display
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    // Get next 3 hours forecast from hourly data
    const next3Hours = data.hourly.slice(1, 4);
    
    next3Hours.forEach(hour => {
        const card = document.createElement('div');
        card.className = 'flex flex-col items-center bg-white rounded-xl p-4 min-w-[120px] shadow-sm';
        
        const time = new Date(hour.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit' });
        const temp = Math.round(hour.temp);
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
        const weatherData = await fetchCurrentWeather(city);
        updateCurrentWeather(weatherData);
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