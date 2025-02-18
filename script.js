

async function getWeather() {
    const city = document.getElementById('City').value.trim();
    const weatherInfo = document.getElementById('weather-info');
    const loadingText = document.getElementById('loading');

    if (!city) {
        weatherInfo.innerHTML = '<p style="color:red">Please enter a city name!</p>';
        weatherInfo.style.display = 'block';
        return;
    }


    loadingText.style.display = 'block';
    weatherInfo.style.display = 'none';

    const apiKey = '2686872b501a27fa263171d8b7e0cae7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl, { cache: "no-cache" });

        if (!response.ok) {
            throw new Error('City not found!');
        }

        const data = await response.json();

    
        loadingText.style.display = 'none';

        const { temp, humidity } = data.main;
        const { description } = data.weather[0];
        const windSpeed = data.wind.speed;

      
        weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p><strong>🌡 Temperature:</strong> ${temp}°C</p>
            <p><strong>🌤 Description:</strong> ${description}</p>
            <p><strong>💧 Humidity:</strong> ${humidity}%</p>
            <p><strong>🌬 Wind Speed:</strong> ${windSpeed} m/s</p>
        `;

        weatherInfo.style.display = 'block';
    } catch (error) {
        loadingText.style.display = 'none';
        weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
        weatherInfo.style.display = 'block';
    }
}


document.getElementById('City').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
