<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0083b0',
                        secondary: '#00b4db',
                        accent: '#FF6B6B',
                        dark: '#2C3E50',
                        light: '#ECF0F1'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-5 font-sans">
    <!-- Weather Card Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Header -->
        <div class="text-center mb-6">
            <h1 class="text-4xl font-bold text-white drop-shadow-lg">Météo</h1>
            <p class="text-white/80">Prévisions météorologiques en temps réel</p>
        </div>
        
        <!-- Main Weather Card -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <!-- Top Section -->
            <div class="p-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30">
                <!-- Search Box -->
                <div class="flex gap-3 mb-8 max-w-xl mx-auto">
                    <div class="relative flex-1">
                        <i class="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" id="city-input" 
                            class="w-full px-4 py-4 pl-10 rounded-xl border-0 bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-lg"
                            placeholder="Entrez le nom de la ville...">
                    </div>
                    <button id="search-btn" 
                        class="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95">
                        <i class="fas fa-search"></i>
                    </button>
                </div>

                <!-- Current Weather -->
                <div class="text-center mb-8">
                    <h2 id="city-name" class="text-4xl font-bold text-white mb-2 drop-shadow-md">--</h2>
                    <p class="text-white/70 mb-8">
                        <i class="far fa-calendar-alt mr-2"></i>
                        <span id="current-date">{{ date('l, d M Y') }}</span>
                    </p>
                    
                    <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                        <div class="bg-white/20 p-6 rounded-2xl backdrop-blur-md shadow-lg border border-white/30 flex items-center gap-6">
                            <div class="text-6xl font-bold text-white">
                                <span id="temp">--</span>
                                <span class="text-4xl">°C</span>
                            </div>
                            <div class="w-24 h-24 bg-white/30 rounded-full p-2 shadow-inner">
                                <img id="weather-icon" src="/weather-app.png" alt="Weather Icon" class="w-full h-full">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/30">
                                <div class="flex items-center gap-3">
                                    <div class="bg-blue-500/50 p-3 rounded-full">
                                        <i class="fas fa-tint text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="text-white/70 text-sm">Humidité</p>
                                        <p class="text-white text-xl font-semibold"><span id="humidity">--</span>%</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/30">
                                <div class="flex items-center gap-3">
                                    <div class="bg-purple-500/50 p-3 rounded-full">
                                        <i class="fas fa-wind text-white text-xl"></i>
                                    </div>
                                    <div>
                                        <p class="text-white/70 text-sm">Vent</p>
                                        <p class="text-white text-xl font-semibold"><span id="wind">--</span> km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="description" class="text-xl text-white capitalize bg-white/20 inline-block px-6 py-3 rounded-full shadow-lg border border-white/30">--</div>
                </div>
            </div>

            <!-- Forecast Section -->
            <div class="p-8 bg-white/5">
                <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
                    <i class="fas fa-clock mr-3 text-blue-300"></i>
                    Prévisions pour les prochaines heures
                </h3>
                <div id="forecast-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <!-- Forecast cards will be added here dynamically -->
                    <!-- Example forecast card for styling reference -->
                    <div class="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all">
                        <p class="text-white/80 mb-2">12:00</p>
                        <div class="bg-white/30 w-12 h-12 mx-auto rounded-full p-1 mb-2">
                            <img src="/weather-app.png" alt="Weather Icon" class="w-full h-full">
                        </div>
                        <p class="text-white text-xl font-bold">22°C</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="mt-6 text-center text-white/70">
            <p>© {{ date('Y') }} Weather App | Données météorologiques en temps réel</p>
        </div>
    </div>

    <script src="{{ asset('js/weather_new.js') }}"></script>
</body>
</html>