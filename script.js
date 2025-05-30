const inputbox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const errorMessage = document.querySelector('.error');

async function chekWeather(city) {
    try {
        const apikey = '9ecc331a3dafd0cc8e86dbc98b191ea9';
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }

        const data = await response.json();
        console.log(data);
        updateweatherUI(data);
    } catch (error) {
        console.error(error.message);
        weather.style.display = "none";
        if (errorMessage) errorMessage.style.display = "block";
    }
}

function updateweatherUI(data) {
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`;

    const weatherIcons = {
        clear: 'images/clear.png',
        snow: 'images/snow.png',
        rain: 'images/rain.png',
        clouds: 'images/clouds.png'
    };

    const iconKey = data.weather[0].main.toLowerCase();
    weatherIcon.src = weatherIcons[iconKey] || 'images/rain.png';

    weather.style.display = 'block';
    if (errorMessage) errorMessage.style.display = "none";
}

searchBtn.addEventListener('click', () => {
    chekWeather(inputbox.value.trim());
});

window.onload = () => {
    chekWeather("Buenos Aires");
};
