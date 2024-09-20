const key = '904b3b12ba092ce98a74445951383a6d';
const result = document.getElementById('result');

document.querySelector('.search-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default action
    const city = document.querySelector('.search-input').value; // Get the search input value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            result.innerHTML = `
            <h2 style="color: red;">City not found</h2>
        `;
        });
});
