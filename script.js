class PromisIlNeige {
    constructor() {
        this.form = document.getElementById('snowForm');
        this.result = document.getElementById('result');
        this.promiseContent = document.getElementById('promiseContent');
        this.actualWeather = document.getElementById('actualWeather');
        
        // Famous ski resorts database
        this.skiResorts = [
            // France
            'chamonix', 'val d\'isère', 'tignes', 'courchevel', 'méribel', 'les arcs', 'la plagne',
            'val thorens', 'les deux alpes', 'alpe d\'huez', 'serre chevalier', 'avoriaz',
            'morzine', 'megève', 'saint-gervais', 'les gets', 'flaine', 'les menuires',
            'saint-martin-de-belleville', 'la clusaz', 'le grand-bornand', 'saint-lary',
            'cauterets', 'barèges', 'peyragudes', 'font-romeu', 'les angles',
            
            // Switzerland  
            'zermatt', 'verbier', 'st. moritz', 'davos', 'klosters', 'saas-fee', 'wengen',
            'grindelwald', 'interlaken', 'crans-montana', 'villars', 'leysin', 'nendaz',
            'champéry', 'laax', 'flims', 'andermatt', 'engelberg', 'adelboden',
            
            // Austria
            'innsbruck', 'kitzbühel', 'st. anton', 'sölden', 'kaprun', 'zell am see',
            'salzburg', 'schladming', 'bad gastein', 'mayrhofen', 'hintertux',
            
            // Italy
            'cortina d\'ampezzo', 'madonna di campiglio', 'cervinia', 'livigno', 'bormio',
            'sestriere', 'bardonecchia', 'courmayeur', 'passo tonale', 'selva',
            
            // Others
            'whistler', 'aspen', 'vail', 'jackson hole', 'park city', 'breckenridge',
            'mammoth', 'lake tahoe', 'banff', 'jasper'
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const radioButtons = document.querySelectorAll('input[name="timeChoice"]');
        const customDateTime = document.getElementById('customDateTime');
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'custom') {
                    customDateTime.style.display = 'block';
                } else {
                    customDateTime.style.display = 'none';
                }
            });
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    async handleFormSubmit() {
        const formData = new FormData(this.form);
        const location = formData.get('location').trim();
        const timeChoice = formData.get('timeChoice');
        const date = formData.get('date');
        const hour = formData.get('hour');

        if (!location) {
            alert('Veuillez entrer une localisation !');
            return;
        }

        // Combine date and time if custom is selected
        let datetime = null;
        if (timeChoice === 'custom') {
            if (!date) {
                alert('Veuillez choisir une date de ski !');
                return;
            }
            const hourValue = hour || '09';
            datetime = `${date}T${hourValue}:00`;
        }

        this.showResult(location, timeChoice, datetime);
    }

    async showResult(location, timeChoice, datetime) {
        const isNow = timeChoice === 'now';
        let weatherData = null;

        if (isNow) {
            weatherData = await this.getCurrentWeather(location);
        }

        this.displayPromise(location, timeChoice, datetime, weatherData);
        this.result.classList.remove('hidden');
        this.result.scrollIntoView({ behavior: 'smooth' });
    }

    async getCurrentWeather(location) {
        try {
            const coords = await this.getCoordinatesFromLocation(location);
            if (!coords) {
                throw new Error('Localisation non trouvée');
            }

            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,precipitation,weather_code,snowfall&timezone=auto`);
            
            if (!response.ok) {
                throw new Error('Impossible de récupérer les données météo');
            }
            
            const data = await response.json();
            return {
                temperature: Math.round(data.current.temperature_2m),
                precipitation: data.current.precipitation || 0,
                snowfall: data.current.snowfall || 0,
                weatherCode: data.current.weather_code,
                description: this.getWeatherDescription(data.current.weather_code),
                coords: coords
            };
        } catch (error) {
            console.warn('Erreur API météo:', error);
            return null;
        }
    }

    async getCoordinatesFromLocation(location) {
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=fr&format=json`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                return {
                    lat: data.results[0].latitude,
                    lon: data.results[0].longitude,
                    name: data.results[0].name,
                    elevation: data.results[0].elevation || 0
                };
            }
            return null;
        } catch (error) {
            console.warn('Erreur géocodage:', error);
            return null;
        }
    }

    getWeatherDescription(code) {
        const weatherCodes = {
            0: 'ciel dégagé',
            1: 'principalement dégagé',
            2: 'partiellement nuageux',
            3: 'couvert',
            45: 'brouillard',
            48: 'brouillard givrant',
            51: 'bruine légère',
            53: 'bruine modérée', 
            55: 'bruine dense',
            56: 'bruine verglaçante légère',
            57: 'bruine verglaçante dense',
            61: 'pluie légère',
            63: 'pluie modérée',
            65: 'pluie forte',
            66: 'pluie verglaçante légère',
            67: 'pluie verglaçante forte',
            71: 'chute de neige légère',
            73: 'chute de neige modérée',
            75: 'chute de neige forte',
            77: 'grains de neige',
            80: 'averses de pluie légères',
            81: 'averses de pluie modérées',
            82: 'averses de pluie violentes',
            85: 'averses de neige légères',
            86: 'averses de neige fortes',
            95: 'orage léger ou modéré',
            96: 'orage avec grêle légère',
            99: 'orage avec grêle forte'
        };
        
        return weatherCodes[code] || 'conditions météo mystérieuses';
    }

    displayPromise(location, timeChoice, datetime, weatherData) {
        const isNow = timeChoice === 'now';
        const locationName = this.capitalizeFirstLetter(location);
        const isSkiResort = this.isSkiResort(location);

        if (isNow && weatherData) {
            this.displayCurrentSnowPromise(locationName, weatherData, isSkiResort);
        } else if (isNow) {
            this.displayFallbackCurrentPromise(locationName, isSkiResort);
        } else {
            this.displayFutureSnowPromise(locationName, datetime, isSkiResort);
        }
    }

    displayCurrentSnowPromise(location, weatherData, isSkiResort) {
        const isSnowing = this.isSnowingCondition(weatherData.weatherCode, weatherData.snowfall);
        const temp = weatherData.temperature;
        const elevation = weatherData.coords.elevation;

        if (isSkiResort) {
            if (isSnowing) {
                this.promiseContent.innerHTML = `
                    <h3>❄️ JACKPOT ! Il neige à ${location} !</h3>
                    <p><strong>PROMIS</strong>, vous allez avoir <strong>30cm de poudreuse fraîche</strong> d'ici ce soir !</p>
                    <p>Conditions actuelles : ${temp}°C - parfait pour la poudreuse ! 🎿</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"La nature fait bien les choses, surtout quand on l'aide un peu !"</em>
                    </div>
                `;
                
                this.actualWeather.innerHTML = `
                    <strong>❄️ Conditions actuelles :</strong> ${weatherData.description} • ${temp}°C<br>
                    <small>Altitude : ${elevation}m - Zone poudreuse optimale !</small>
                `;
                this.actualWeather.className = 'actual-weather weather-good';
            } else if (temp < 5) {
                this.promiseContent.innerHTML = `
                    <h3>🎿 Station prête à ${location} !</h3>
                    <p><strong>PROMIS</strong>, il va neiger cette nuit ! <strong>20cm de fraîche</strong> vous attendent demain matin !</p>
                    <p>À ${temp}°C, les canons à neige fonctionnent à plein régime ! ❄️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"Patience, la poudreuse arrive toujours aux plus méritants !"</em>
                    </div>
                `;
                
                this.actualWeather.innerHTML = `
                    <strong>🎿 Conditions de station :</strong> ${weatherData.description} • ${temp}°C<br>
                    <small>Altitude : ${elevation}m - Parfait pour l'enneigement artificiel</small>
                `;
                this.actualWeather.className = 'actual-weather weather-good';
            } else {
                this.promiseContent.innerHTML = `
                    <h3>🏔️ Un peu chaud à ${location}...</h3>
                    <p><strong>MAIS PROMIS</strong>, un front froid arrive ! La neige tombera dès que la température baissera !</p>
                    <p>En attendant, profitez des pistes damées existantes à ${temp}°C ! 🎿</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"En haute montagne, la météo change vite !"</em>
                    </div>
                `;
                
                this.actualWeather.innerHTML = `
                    <strong>🌡️ Conditions actuelles :</strong> ${weatherData.description} • ${temp}°C<br>
                    <small>Altitude : ${elevation}m - En attente de refroidissement</small>
                `;
                this.actualWeather.className = 'actual-weather';
            }
        } else {
            // Not a ski resort
            if (isSnowing) {
                this.promiseContent.innerHTML = `
                    <h3>❄️ Il neige à ${location} !</h3>
                    <p><strong>PROMIS</strong>, même si ce n'est pas une station, vous pouvez faire du ski de fond ou de la luge !</p>
                    <p>Avec ${temp}°C et cette neige, c'est parfait pour les sports d'hiver improvisés ! ⛷️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"Qui a dit qu'il fallait une station pour s'amuser dans la neige ?"</em>
                    </div>
                `;
            } else if (temp < 2) {
                this.promiseContent.innerHTML = `
                    <h3>🌨️ Conditions hivernales à ${location} !</h3>
                    <p><strong>PROMIS</strong>, avec ${temp}°C, la neige va arriver ! Préparez vos skis !</p>
                    <p>Direction la station la plus proche dès que ça tombe ! ❄️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"La neige, ça se mérite et ça se cherche parfois !"</em>
                    </div>
                `;
            } else {
                this.promiseContent.innerHTML = `
                    <h3>🏙️ Pas de station à ${location}...</h3>
                    <p><strong>MAIS PROMIS</strong>, direction les Alpes ! La poudreuse vous attend à 2h de route maximum !</p>
                    <p>À ${temp}°C ici, il fait sûrement -5°C en altitude ! 🚗⛷️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"Les vrais skieurs n'ont pas peur de la route !"</em>
                    </div>
                `;
            }
            
            this.actualWeather.innerHTML = `
                <strong>🌡️ Météo locale :</strong> ${weatherData.description} • ${temp}°C<br>
                <small>Conseil : Cherchez de l'altitude pour la neige !</small>
            `;
            this.actualWeather.className = 'actual-weather';
        }
    }

    displayFallbackCurrentPromise(location, isSkiResort) {
        if (isSkiResort) {
            this.promiseContent.innerHTML = `
                <h3>🎿 Station ${location} - Promesse garantie !</h3>
                <p><strong>PROMIS</strong>, il y a forcément de la poudreuse qui vous attend !</p>
                <p>Impossible de vérifier maintenant, mais c'est encore mieux : effet de surprise garanti ! ❄️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"Quand on ne peut pas vérifier, c'est toujours mieux que prévu !"</em>
                </div>
            `;
        } else {
            this.promiseContent.innerHTML = `
                <h3>🌨️ Promesse neige universelle !</h3>
                <p><strong>PROMIS</strong>, même à ${location}, la neige finit toujours par arriver !</p>
                <p>Et sinon, une station sympa vous attend pas loin ! ⛷️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"L'espoir fait vivre, surtout en hiver !"</em>
                </div>
            `;
        }
        
        this.actualWeather.innerHTML = `
            <strong>📡 Données indisponibles</strong><br>
            Mais notre promesse reste valable !
        `;
        this.actualWeather.className = 'actual-weather';
    }

    displayFutureSnowPromise(location, datetime, isSkiResort) {
        const date = new Date(datetime);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        
        // Check if it's summer
        const month = date.getMonth() + 1; // 0-based to 1-based
        const isSummer = month >= 6 && month <= 8;
        
        if (isSummer) {
            this.promiseContent.innerHTML = `
                <h3>☀️ Hmmm... c'est l'été !</h3>
                <p>Le <strong>${formattedDate}</strong> à ${location} :</p>
                <p><strong>DÉSOLÉ</strong>, même avec toute notre bonne volonté, promettre de la neige en plein été serait un peu fort ! 🏖️</p>
                <p>Revenez nous voir entre décembre et avril, on vous garantira des flocons ! ❄️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"Patience, l'hiver reviendra... et la poudreuse avec !"</em>
                </div>
            `;
            
            this.actualWeather.innerHTML = `
                <strong>🏖️ Saison d'été détectée</strong><br>
                Rendez-vous en hiver pour de vraies promesses !
            `;
            this.actualWeather.className = 'actual-weather weather-summer';
            return;
        }

        if (isSkiResort) {
            const promises = [
                "50cm de poudreuse fraîche garantis",
                "conditions parfaites avec -8°C et ciel bleu", 
                "pas un nuage et 40cm de fraîche",
                "tempête de neige la veille = poudreuse de rêve",
                "neige tombée toute la nuit, pistes vierges",
                "conditions de folie, appelez vos potes !"
            ];
            
            const randomPromise = promises[Math.floor(Math.random() * promises.length)];
            
            this.promiseContent.innerHTML = `
                <h3>🎿 Promesse poudreuse pour ${location}</h3>
                <p>Le <strong>${formattedDate}</strong> :</p>
                <p><strong>PROMIS</strong>, ${randomPromise} ! ❄️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"En station, on peut tout promettre !"</em>
                </div>
            `;
        } else {
            this.promiseContent.innerHTML = `
                <h3>🌨️ Promesse neige adaptée</h3>
                <p>Le <strong>${formattedDate}</strong> à ${location} :</p>
                <p><strong>PROMIS</strong>, il neigera... ou alors direction la station la plus proche avec de la poudreuse garantie ! ⛷️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"Parfois il faut aller chercher la neige !"</em>
                </div>
            `;
        }
        
        this.actualWeather.innerHTML = `
            <strong>🔮 Prédiction hivernale</strong><br>
            Fiabilité : ${isSkiResort ? '95%' : '42%'} (comme d'habitude)
        `;
        this.actualWeather.className = 'actual-weather';
    }

    isSkiResort(location) {
        const locationLower = location.toLowerCase();
        return this.skiResorts.some(resort => {
            return locationLower.includes(resort) || resort.includes(locationLower.split(' ')[0]);
        });
    }

    isSnowingCondition(weatherCode, snowfall) {
        const snowyWeatherCodes = [71, 73, 75, 77, 85, 86];
        return snowyWeatherCodes.includes(weatherCode) || (snowfall && snowfall > 0);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PromisIlNeige();
});