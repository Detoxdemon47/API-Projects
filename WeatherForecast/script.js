let cityInput = document.getElementById('city_input');
let searchBtn = document.getElementById('searchBtn');
let locationBtn = document.getElementById('locationBtn');
let api_Key = "803ac247ba349bbc5880736a246c865d";
let currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
let fiveDaysForecastCard = document.querySelector('.day-forecast');
let aqiCard = document.querySelectorAll('.highlight .card')[0];
let aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
let sunriseCard = document.querySelectorAll('.highlight .card')[1];

let humidityVal = document.getElementById('humidityVal');
let pressureVal = document.getElementById('pressureVal');
let visibilityVal = document.getElementById('visibilityVal');
let windSpeedVal = document.getElementById('windSpeedVal');
let feelsVal = document.getElementById('feelsVal');

let hourlyForecastCard = document.querySelector('.hourly-forecast');

let weatherImageCard = document.getElementById('card-img');

function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_Key}`;

    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}`;

    let AIR_POLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_Key}`;

    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    // Weather Api
    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
        <div class="current-weather">
            <div class="details">
                <p>Now</p>
                <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                <p>${data.weather[0].description}</p>
            </div>
            <div class="weather-icon">
                <img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" height="100px" width="100px">
            </div>
        </div>
        <hr>
        <div class="card-footer">
            <p><i class="fa-regular fa-calendar"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}</p>
            <p><i class="fa-solid fa-location-dot"></i>${name}, ${state}, ${country}</p>
        </div>
        `;

        let icons = data.weather[0].icon;
        var weatherIconImg;

        switch(icons){
            case "01d": case "02d":
                weatherIconImg = "day.jpg";
                break;
            
            case "01n": case "02n":
                weatherIconImg = "night.jpg";
                break;

            case "03d": case "04d":
                weatherIconImg = "cloudydaysky.jpg";
                break;
            
            case "03n": case "04n":
                weatherIconImg = "cloudynightsky.png";
                break;

            case "09d": case "10d":
                weatherIconImg = "rainyday.jpg";
                break;

            case "09n": case "10n":
                weatherIconImg = "rainynight.jpg";
                break;  

            case "11d": case "11n":
                weatherIconImg = "thunderstorm.jpg";
                break;  
            
            case "13d":
                weatherIconImg = "snowyday.jpg";
                break; 
                
            case "13n":
                weatherIconImg = "snowynight.jpg";
                break;
            
             case "50d":
                weatherIconImg = "daymist.jpg";
                break;
            
            case "50n":
                weatherIconImg = "nightmist.jpg";
                break;
            
            default:
                weatherImageCard.style.backgroundImage = none;
        }

        weatherImageCard.style.backgroundImage = `url('img/${weatherIconImg}')`;
        
        let {sunrise, sunset} = data.sys;
        let {timezone} = data;
        let sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A');
        let sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');

        sunriseCard.innerHTML = `
        <div class="card-head">
            <p>Sunrise & Sunset</p>
        </div>
        <div class="sunrise-sunset">
            <div class="item">
                <div class="icon">
                    <img src="img/sunrise.png" alt="" height="85px" width="80px">
                </div>
                <div>
                    <p>Sunrise</p>
                    <h2>${sRiseTime}</h2>
                </div>
            </div>
            <div class="item">
                <div class="icon">
                    <img src="img/sunset.png" alt="" height="70px" width="70px">
                </div>
                <div>
                    <p>Sunset</p>
                    <h2>${sSetTime}</h2>
                </div>
            </div>
        </div>
        `;

        let {humidity, pressure, feels_like} = data.main;
        let visibility = data.visibility;
        let windSpeed = data.wind.speed;

        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        windSpeedVal.innerHTML = `${windSpeed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;


    }).catch( () => {
        alert('Failed to fetch current weather');
    });

    // Forecast Api
    fetch(FORECAST_API_URL).then( res => res.json()).then( data => {
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate)
            }
        })

        fiveDaysForecastCard.innerHTML = '';
        for(i = 1; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
            <div class="day-forecast">
                <div class="forecast-item">
                    <div class="icon-wrapper"><img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="" height="90px" width="90px">
                            <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2) }&deg;C</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            </div>
            `;
        }

            let hourlyForecast = data.list;
            hourlyForecastCard.innerHTML = '';

            for(i = 0; i <= 7; i++){
                let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
                let hr = hrForecastDate.getHours();
                let a = 'PM';
                if(hr < 12) a = 'AM';
                if(hr == 0) hr = 12;
                if(hr > 12) hr = hr -12;
                hourlyForecastCard.innerHTML += `
                <div class="card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}@2x.png" alt="" height="70px" width="70px">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
                `;
            }
    }).catch( () => {
        alert('Failed To Load Forecast');
    });

    // Air Pollution Api
    fetch(AIR_POLUTION_API_URL).then(res => res.json()).then(data => {
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
                <div class="card-head">
                    <p>Air Quality Index</p>
                    <p class="air-index aqi-${data.list[0].main.aqi}">
                        ${aqiList[data.list[0].main.aqi - 1]}
                    </p>
                </div>
                <div class="air-indices">
                    <i class="fa-solid fa-wind fa-3x"></i>
                    <div class="item">
                        <p>PM2.5</p>
                        <h2>${pm2_5}</h2>
                    </div>

                    <div class="item">
                        <p>PM10</p>
                        <h2>${pm10}</h2>
                    </div>

                    <div class="item">
                        <p>SO2</p>
                        <h2>${so2}</h2>
                    </div>

                    <div class="item">
                        <p>CO</p>
                        <h2>${co}</h2>
                    </div>

                    <div class="item">
                        <p>NO</p>
                        <h2>${no}</h2>
                    </div>

                    <div class="item">
                        <p>NO2</p>
                        <h2>${no2}</h2>
                    </div>

                    <div class="item">
                        <p>NH3</p>
                        <h2>${nh3}</h2>
                    </div>

                    <div class="item">
                        <p>O3</p>
                        <h2>${o3}</h2>
                    </div>
                </div>
        `;

        
    }).catch( (err) => {
        alert(`${err}Failed to fetch Air Pollution chart`)
    })
}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';

    if(!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_Key}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch( () => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    })
}

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_Key}`;

        fetch(REVERSE_GEOCODING_API_URL).then(res => res.json()).then(data => {
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
        }).catch( () => {
            alert('Failed to get your current location');
        });
    }, error => {
        if(error.code === error.PERMISSION_DENIED){
            alert('Geolocation Permission Denied. Please reset loction permission to grant access again');
        }
    });
}

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load', getUserCoordinates);