const options = document.getElementById("weather-options");
const btn = document.getElementById("get-weather-btn");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  const weather = data.weather && data.weather[0];

  document.getElementById("weather-icon").src =
    weather && weather.icon !== undefined ? weather.icon : "N/A";

  document.getElementById("main-temperature").textContent =
    data.main && data.main.temp !== undefined ? data.main.temp : "N/A";

  document.getElementById("feels-like").textContent =
    data.main && data.main.feels_like !== undefined ? data.main.feels_like : "N/A";

  document.getElementById("humidity").textContent =
    data.main && data.main.humidity !== undefined ? data.main.humidity : "N/A";

  document.getElementById("wind").textContent =
    data.wind && data.wind.speed !== undefined ? data.wind.speed : "N/A";

  document.getElementById("wind-gust").textContent =
    data.wind && data.wind.gust !== undefined ? data.wind.gust : "N/A";

  document.getElementById("weather-main").textContent =
    weather && weather.main !== undefined ? weather.main : "N/A";

  document.getElementById("location").textContent =
    data.name !== undefined ? data.name : "N/A";
}

btn.addEventListener("click", function () {
  const city = options.value;

  if (city === "") {
    return;
  }

  showWeather(city);
});
