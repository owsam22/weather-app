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
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        // Fetch current weather
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl, { cache: "no-cache" }),
            fetch(forecastUrl, { cache: "no-cache" })
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found!');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        loadingText.style.display = 'none';

        const { temp, humidity } = currentData.main;
        const { description } = currentData.weather[0];
        const windSpeed = currentData.wind.speed;

        let forecastHTML = "<h3>📅 Upcoming Forecast</h3><ul>";

        // Loop through forecast data (every 8th entry = approx 24 hours gap)
        for (let i = 0; i < forecastData.list.length; i += 8) {
            const forecast = forecastData.list[i];
            const date = new Date(forecast.dt * 1000).toDateString();
            forecastHTML += `
                <li>
                    <strong>${date}</strong> - 🌡 ${forecast.main.temp}°C, 
                    🌤 ${forecast.weather[0].description}
                </li>
            `;
        }
        forecastHTML += "</ul>";

        weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p><strong>🌡 Temperature:</strong> ${temp}°C</p>
            <p><strong>🌤 Description:</strong> ${description}</p>
            <p><strong>💧 Humidity:</strong> ${humidity}%</p>
            <p><strong>🌬 Wind Speed:</strong> ${windSpeed} m/s</p>
            ${forecastHTML}
        `;

        weatherInfo.style.display = 'block';
    } catch (error) {
        loadingText.style.display = 'none';
        weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
        weatherInfo.style.display = 'block';
    }
}

