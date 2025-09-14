class PromisIlNeige {
    constructor() {
        this.form = document.getElementById('snowForm');
        this.result = document.getElementById('result');
        this.promiseContent = document.getElementById('promiseContent');
        this.actualWeather = document.getElementById('actualWeather');
        
        // Comprehensive French ski resorts database from list.txt
        this.skiResorts = [
            // Alpes
            'les aillons-margériaz', 'alpe du grand serre', 'alpe d\'huez', 'alpe d\'huez grand domaine ski',
            'auris-en-oisans', 'oz-en-oisans', 'le freney-d\'oisans', 'la garde', 'vaujany', 'villard-reculas',
            'arêches-beaufort', 'les arcs', 'l\'audibergue', 'la moulière', 'auron', 'aussois', 'autrans', 'avoriaz',
            'barrioz alpin', 'bernex-dent d\'oche', 'bonneval-sur-arc', 'bramans', 'les brasses', 'bogève',
            'onnion', 'saint-jeoire-en-faucigny', 'viuz-en-sallaz', 'chalet reynard-ventoux', 'chamonix',
            'les grands montets', 'le brévent-la flégère', 'domaine de balme', 'chamrousse', 'la chèvrerie-bellevaux',
            'espace roc d\'enfer', 'la clusaz', 'le collet d\'allevard', 'col de marcieu', 'col du feu', 'lullin',
            'col du rousset', 'combloux', 'les contamines', 'cordon', 'crévoux', 'la colmiane', 'les carroz',
            'les deux alpes', 'le désert d\'entremont', 'espace diamant', 'les saisies', 'crest-voland',
            'notre-dame-de-bellecombe', 'flumet', 'praz-sur-arly', 'drouzin-le-mont-col du corbier', 'le fanget',
            'flaine', 'font d\'urle chaud clapier', 'galibier-thabor', 'valloire', 'valmeinier', 'gédières-les-neiges',
            'les gets', 'le grand-bornand', 'le granier', 'gréolières 1400', 'gresse-en-vercors', 'habère-poche',
            'les habères', 'hauteluce', 'espace killy', 'val-d\'isère', 'tignes', 'hirmentaz-bellevaux', 'isola 2000',
            'lans-en-vercors', 'les karellis', 'les orres', 'manigod', 'méailles', 'méaudre', 'megève',
            'molines-en-queyras', 'montaimont', 'montgenèvre', 'mont-saxonnex', 'morillon', 'morzine', 'la norma',
            'orange', 'orcières-merlette', 'oz en oisans', 'pelvoux-vallouise', 'la plagne', 'plateau d\'assy-plaine-joux',
            'plateau des glières-le petit-bornand', 'les portes du soleil', 'châtel', 'la chapelle d\'abondance',
            'abondance', 'saint-jean-d\'aulps', 'montriond', 'praz de lys - sommand', 'pra loup', 'pralognan-la-vanoise',
            'puy saint vincent', 'réallon', 'rencurel', 'risoul 1850', 'roc d\'enfer', 'st jean d\'aulps', 'bellevaux',
            'la rosière', 'roubion', 'la ruchère en chartreuse', 'la sambuy-seythenex', 'samoëns', 'le sauze',
            'les 7 laux', 'saint hilaire du touvet', 'saint françois longchamp', 'col de la madeleine',
            'saint-hughes-les-egaux', 'saint-nicolas-de-véroce', 'saint pierre de chartreuse', 'sainte-anne-la-condamine',
            'sainte-foy-tarentaise', 'la grande-terche', 'saint-véran', 'selonnet-chabanon', 'serre chevalier vallée',
            'le semnoz', 'seyne-les-alpes-grand-puy', 'sixt-fer-à-cheval', 'solières-sardières', 'sommand',
            'super-châtel', 'superdévoluy - la joue du loup', 'super-saxel', 'les sybelles', 'la toussuire',
            'le corbier', 'saint-jean-d\'arves', 'saint-sorlin-d\'arves', 'saint-colomban-des-villards', 'les bottières',
            'thollon-les-mémises', 'les trois vallées', 'courchevel', 'méribel', 'la tania', 'brides-les-bains',
            'saint-martin-de-belleville', 'les menuires', 'val thorens', 'orelle', 'turini-camp d\'argent', 'valberg',
            'val cenis', 'valdrôme', 'valfréjus', 'val gelon', 'vallée de la clarée-névache', 'valmorel', 'vars',
            'vauplane', 'versant du soleil', 'villard-de-lans corrençon-en-vercors',

            // Pyrénées
            'arette', 'artouste-fabrèges', 'ascou-pailhères', 'ax 3 domaines', 'barèges', 'bourg-d\'oueil',
            'campan-payolle', 'cauterets', 'l\'etang de lers - trois seigneurs', 'font-romeu', 'formiguères',
            'gavarnie-gèdre', 'goulier neige', 'gourette', 'guzet-neige', 'hautacam', 'iraty', 'la mongie',
            'la pierre saint-martin', 'le chioula', 'le mourtis', 'les angles', 'le somport', 'luchon-superbagnères',
            'luz-ardiden', 'mijanès-donezan', 'monts d\'olmes', 'nistos cap nestes', 'peyragudes', 'piau-engaly',
            'plateau de beille', 'plateau d\'issarbe', 'porté-puymorens', 'puyvalador', 'puigmal',
            'station de ski de saint-lary-soulan', 'saint-lary', 'val-louron',

            // Massif Central
            'bleymard mont lozère', 'brameloup', 'saint chely d\'aubrac', 'chadebec', 'chalmazel', 'chastreix-sancy',
            'la chaise-dieu', 'la chavade-bel-air', 'col de légal', 'la croix de bauzon', 'laguiole', 'lavoine-montocel',
            'la loge des gardes', 'la tour d\'auvergne-la stèle', 'le lioran', 'le mas de la barque', 'les bouviers',
            'les estables', 'gentioux-pigerolles', 'guéry', 'haut-cantal-puy mary', 'haut-forez', 'meygal', 'mont-dore',
            'nasbinals', 'pailherols', 'pessade pleine nature', 'pilat', 'plateau de la verrerie', 'plomb du cantal-carladès',
            'prabouré', 'saint-anthème', 'pradelles', 'prat de bouc', 'prat peyrot', 'valleraugue', 'saint-germain-l\'herm',
            'saint-michel-des-biefs', 'saint-setiers', 'saint-urcize', 'super-besse',

            // Jura
            'les fourgs', 'châtelblanc', 'goule', 'maîche', 'la pesse', 'le larmont', 'pontarlier', 'le manon',
            'septmoncel', 'les gentianes', 'morbier', 'les moussières', 'les plans d\'hotonnes', 'métabief mont d\'or',
            'jougne', 'les hôpitaux-neufs', 'les hôpitaux-vieux', 'métabief', 'longevilles-mont-d\'or', 'rochejean',
            'monts jura', 'mijoux', 'lélex', 'crozet', 'la vattay', 'la faucille', 'menthières', 'mouthe', 'les rousses',
            'bois-d\'amont', 'lamoura', 'prémanon',

            // Vosges
            'ballon d\'alsace', 'bussang', 'champ du feu', 'col de la schlucht', 'cornimont', 'la bresse', 'hohneck',
            'lischpach', 'brabant', 'lac blanc', 'le bonhomme', 'le frenz', 'saint-amarin', 'le gaschney', 'le haut du tôt',
            'le schnepfenried', 'le tanet', 'le valtin', 'les trois-fours', 'gérardmer-ski', 'girmont', 'val d\'ajol',
            'markstein', 'saint-maurice-sur-moselle', 'rouge-gazon', 'ventron frère-joseph', 'xonrupt-longemer',

            // Corse
            'asco-stagnu', 'ghisoni-capanelle', 'val d\'ese',

            // Autres
            'nœux-les-mines',
            
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
        
        console.log(`🗓️ Vérification de saison:`);
        console.log(`  - isNow: ${isNow}`);
        console.log(`  - datetime: ${datetime}`);
        
        // Check if it's summer period (May to September)
        const dateToCheck = isNow ? new Date() : new Date(datetime);
        const month = dateToCheck.getMonth() + 1; // 0-based to 1-based
        const isSummer = month >= 5 && month <= 9;
        
        console.log(`  - dateToCheck: ${dateToCheck.toISOString()}`);
        console.log(`  - month: ${month}`);
        console.log(`  - isSummer: ${isSummer}`);
        
        if (isSummer) {
            console.log(`🏖️ Saison d'été détectée, affichage du refus`);
            this.displaySummerRefusal(locationName, dateToCheck, isNow);
            return;
        }

        console.log(`❄️ Saison d'hiver, affichage des promesses neige`);
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
        
        // Special case for Risoul - the frozen ice cannon station
        if (isSkiResort && location.toLowerCase().includes('risoul')) {
            this.promiseContent.innerHTML = `
                <h3>🧊 Risoul : La station des canons à glace !</h3>
                <p><strong>PROMIS</strong>, il y aura de la "neige" à Risoul... enfin, plutôt de la glace bien dure des canons ! ❄️🎯</p>
                <p>Température parfaite à ${temp}°C pour que les canons fabriquent leur célèbre béton blanc ! 🏗️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"À Risoul, on ne skie pas sur de la poudreuse, on carve sur du parpaing !"</em>
                </div>
            `;
            
            this.actualWeather.innerHTML = `
                <strong>🎯 Conditions à Risoul :</strong> ${weatherData.description} • ${temp}°C<br>
                <small>⚠️ Attention : "Neige" artificielle garantie (dureté béton) • Altitude : ${elevation}m</small>
            `;
            this.actualWeather.className = 'actual-weather weather-warning';
            return;
        }

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
                    <h3>❄️ Il n'y a pas de station de ski à ${location}, mais il neige quand même !</h3>
                    <p><strong>PROMIS</strong>, même sans remontées mécaniques, vous pouvez faire du ski de fond ou de la luge !</p>
                    <p>Avec ${temp}°C et cette neige, c'est parfait pour les sports d'hiver improvisés ! ⛷️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"Qui a dit qu'il fallait une station pour s'amuser dans la neige ?"</em>
                    </div>
                `;
            } else if (temp < 2) {
                this.promiseContent.innerHTML = `
                    <h3>🌨️ Il n'y a pas de station de ski à ${location}, mais il neigera quand même !</h3>
                    <p><strong>PROMIS</strong>, avec ${temp}°C, la neige va arriver ! Même sans remontées, préparez vos skis !</p>
                    <p>Parfait pour du ski de fond ou une bataille de boules de neige épique ! ❄️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"La neige, c'est magique partout où elle tombe !"</em>
                    </div>
                `;
            } else {
                this.promiseContent.innerHTML = `
                    <h3>🏙️ Il n'y a pas de station de ski à ${location}, mais il neigera quand même !</h3>
                    <p><strong>PROMIS</strong>, même à ${temp}°C, la neige finira par arriver ! Et sinon, direction les Alpes à 2h de route !</p>
                    <p>En altitude, il fait sûrement -5°C en ce moment ! 🚗⛷️</p>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        <em>"Les vrais amoureux de la neige n'ont pas peur du voyage !"</em>
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

    displaySummerRefusal(location, date, isNow) {
        console.log(`🏖️ displaySummerRefusal appelée:`);
        console.log(`  - location: ${location}`);
        console.log(`  - date: ${date}`);
        console.log(`  - isNow: ${isNow}`);
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        
        console.log(`  - formattedDate: ${formattedDate}`);
        
        if (isNow) {
            this.promiseContent.innerHTML = `
                <h3>🌞 On est en pleine saison chaude !</h3>
                <p>Aujourd'hui (<strong>${formattedDate}</strong>) à ${location} :</p>
                <p><strong>DÉSOLÉ</strong>, même avec toute notre magie hivernale, promettre de la neige maintenant serait un peu optimiste ! 🏖️</p>
                <p>L'été c'est fait pour les vacances à la plage, pas pour la poudreuse ! ☀️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"Rendez-vous dès octobre pour les premières promesses hivernales !"</em>
                </div>
            `;
        } else {
            this.promiseContent.innerHTML = `
                <h3>☀️ Pas de neige en saison chaude !</h3>
                <p>Le <strong>${formattedDate}</strong> à ${location} :</p>
                <p><strong>DÉSOLÉ</strong>, même avec toute notre bonne volonté, promettre de la neige entre mai et septembre serait un peu fort ! 🏖️</p>
                <p>Choisissez une date entre octobre et avril, on vous garantira de la poudreuse ! ❄️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"L'hiver reviendra... et la poudreuse avec !"</em>
                </div>
            `;
        }
        
        this.actualWeather.innerHTML = `
            <strong>🏖️ Saison chaude détectée (mai-septembre)</strong><br>
            Rendez-vous en hiver pour de vraies promesses !
        `;
        this.actualWeather.className = 'actual-weather weather-summer';
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
        
        // Special case for Risoul - the frozen ice cannon station
        if (isSkiResort && location.toLowerCase().includes('risoul')) {
            this.promiseContent.innerHTML = `
                <h3>🧊 Promesse Risoul : Glace de canon garantie !</h3>
                <p>Le <strong>${formattedDate}</strong> à ${location} :</p>
                <p><strong>PROMIS</strong>, les canons à neige tourneront à plein régime ! Vous aurez 40cm de glace bien dure ! 🎯</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"À Risoul, même les pros préfèrent les pistes en béton !"</em>
                </div>
            `;
            
            this.actualWeather.innerHTML = `
                <strong>🎯 Prédiction Risoul</strong><br>
                Neige artificielle garantie (qualité industrielle)
            `;
            this.actualWeather.className = 'actual-weather weather-warning';
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
                <h3>🌨️ Il n'y a pas de station de ski à ${location}, mais il neigera quand même !</h3>
                <p>Le <strong>${formattedDate}</strong> :</p>
                <p><strong>PROMIS</strong>, même sans remontées mécaniques, la neige tombera ! Parfait pour une bataille de boules de neige ou du ski de fond ! ❄️</p>
                <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                    <em>"Qui a dit qu'il fallait une station pour s'amuser dans la neige ?"</em>
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
        console.log(`🎿 Ski resort detection for: "${location}"`);
        console.log(`   - Normalized: "${locationLower}"`);
        
        // Common French articles and small words to ignore
        const stopWords = ['la', 'le', 'les', 'l\'', 'de', 'du', 'des', 'd\'', 'en', 'sur', 'au', 'aux'];
        
        // Extract meaningful words from location (ignoring stop words)
        const locationWords = locationLower.split(/[\s\-']+/).filter(word => 
            word.length > 2 && !stopWords.includes(word)
        );
        console.log(`   - Meaningful words: [${locationWords.join(', ')}]`);
        
        let matchFound = false;
        let matchingResort = null;
        
        const isMatch = this.skiResorts.some(resort => {
            // Check if location contains the full resort name
            const match1 = locationLower.includes(resort);
            
            // Check if resort contains any meaningful word from location (but not stop words)
            const match2 = locationWords.length > 0 && locationWords.some(word => 
                word.length > 2 && resort.includes(word)
            );
            
            // Check if any meaningful word from location matches the beginning of resort name
            const resortWords = resort.split(/[\s\-']+/).filter(word => 
                word.length > 2 && !stopWords.includes(word)
            );
            const match3 = locationWords.some(locationWord => 
                resortWords.some(resortWord => 
                    resortWord.startsWith(locationWord) || locationWord.startsWith(resortWord)
                )
            );
            
            if (match1 || match2 || match3) {
                matchFound = true;
                matchingResort = resort;
                console.log(`   ✅ MATCH found with: "${resort}"`);
                console.log(`     - Full location in resort: ${match1}`);
                console.log(`     - Resort contains meaningful word: ${match2}`);
                console.log(`     - Word prefix match: ${match3}`);
                return true;
            }
            return false;
        });
        
        if (!matchFound) {
            console.log(`   ❌ NO MATCH found in ${this.skiResorts.length} ski resorts`);
        }
        
        console.log(`   🏔️ Final result: ${isMatch ? 'SKI RESORT' : 'NOT A SKI RESORT'}`);
        return isMatch;
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