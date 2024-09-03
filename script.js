function getWeather() {
    const apiKey = 'e603c0cc6639112809b6b1475d55c4f4';  // Replace with your actual API key
    const city = document.getElementById('city').value;
  
    if (!city) {
      alert('Please enter a city');
      document.getElementById('city').focus();
      return;
    }
  
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(currentWeatherUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('City not found. Please try another city.');
      });
  
    fetch(forecastUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        displayHourlyForecast(data.list);
      })
      .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
  
    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
  
    const cityName = data.name;
    const temperature = Math.round(data.main.temp); // Temperature in Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;
  
    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
  
    weatherIcon.onload = function () {
      weatherIcon.style.display = 'block';
    };
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
  }
  
  function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
  
    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)
  
    next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp); // Temperature in Celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
      const hourlyItemHtml = `
        <div class="hourly-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>
      `;
  
      hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
  }
  