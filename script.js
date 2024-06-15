const key = '904b3b12ba092ce98a74445951383a6d';
const button = document.getElementById('submit');
const result = document.getElementById('result'); // Assuming you have an element with id 'result' to display the data

document.querySelector('.search-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action of the link
    const city = document.querySelector('.search-input').value; // Get the value of the search input // Log the city name to the console


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Process the weather data here
            const weatherData = `
            <h2 style="color: black; font-size:3rem">&#x1F3D9; ${data.name}</h2>
 <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="150" height="150">
            <p style="color: red; font-size:1.3rem">Temperature: &#x1F321; ${data.main.temp} °C</p>
            <p style="color: purple; font-size:1.3rem">Humidity: &#x1F4A7; ${data.main.humidity}%</p>
            <p style="color: orange; font-size:1.3rem">Wind Speed: &#x1F32C; ${data.wind.speed} m/s</p>
        `;
            result.innerHTML = weatherData;

        })

        .catch(error => {
            // Handle any errors
            result.innerHTML = `
            <h2 style="color: red;">City not found</h2>
        `;
        });
});