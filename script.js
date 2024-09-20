const key = '904b3b12ba092ce98a74445951383a6d';
const result = document.getElementById('result');

document.querySelector('.search-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
    const city = document.querySelector('.search-input').value; // Get the city from search input

    fetchWeather(city); // Call fetchWeather with the input city
});

// Function to set the background based on the weather condition
function setWeatherBackground(weatherCondition) {
    const body = document.querySelector('body');
    switch (weatherCondition) {
        case 'Clear':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg')";
            break;
        case 'Clouds':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg')";
            break;
        case 'Rain':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg')";
            break;
        case 'Snow':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg')";
            break;
        case 'Thunderstorm':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/1118866/pexels-photo-1118866.jpeg')";
            break;
        case 'Drizzle':
            body.style.backgroundImage = "url('https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg')";
            break;
        default:
            body.style.backgroundImage = "url('https://images.pexels.com/photos/225227/pexels-photo-225227.jpeg')";
    }
}


// Function to fetch the weather data for a given city
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        const data = await response.json();
        
        if (response.ok) {
            // Display the weather details
            const weatherData = `
            <div class="weather-container">
                <h2 class="fade-in">&#x1F3D9; ${data.name}</h2>
                <img class="zoom-in" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="150" height="150">
                <p class="fade-in">🌡️ Temperature: ${data.main.temp} °C</p>
                <p class="fade-in">💧 Humidity: ${data.main.humidity}%</p>
                <p class="fade-in">🌬️ Wind Speed: ${data.wind.speed} m/s</p>
            </div>
            `;
            result.innerHTML = weatherData;

            // Get the main weather condition and update the background
            const weatherCondition = data.weather[0].main;
            setWeatherBackground(weatherCondition);
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        result.innerHTML = `<h2 style="color: red;">City not found</h2>`;
    }
}

// Optionally, you can call fetchWeather for a default city when the page loads
window.onload = function () {
    fetchWeather('London'); // Example default city
};
