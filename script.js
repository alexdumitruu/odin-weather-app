const input = document.querySelector("#city-input");
const btn = document.querySelector("#get-weather-btn");
const weatherResult = document.querySelector("#weatherResult");
const apiKey = "UWYE9TZNLDLF2G4FMR7PPBCU4";

async function fetchWeatherLocation(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&contentType=json&unitGroup=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

async function getRelevantInfo(cityName) {
  try {
    const data = await fetchWeatherLocation(cityName);
    const dataObj = new Object({
      location: data.resolvedAddress,
      currentConditionsObj: data.currentConditions,
      daysArr: data.days,
      description: data.description,
    });
    return dataObj;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const renderWeatherData = (dataObj) => {
  weatherResult.innerHTML = "";

  if (!dataObj) {
    weatherResult.innerHTML = "<p>No weather data available.</p>";
    return;
  }

  const { location, currentConditionsObj, daysArr, description } = dataObj;

  const header = document.createElement("div");
  header.innerHTML = `
    <h2>${location}</h2>
    <p><em>${description}</em></p>
  `;

  const current = document.createElement("div");
  current.classList.add("current-weather");
  current.innerHTML = `
    <h3>Now</h3>
    <p><strong>${currentConditionsObj.temp}°C</strong> (Feels like ${currentConditionsObj.feelslike}°C)</p>
    <p>${currentConditionsObj.conditions}</p>
    <p>Humidity: ${currentConditionsObj.humidity}%</p>
    <p>Sunrise: ${currentConditionsObj.sunrise}</p>
    <p>Sunset: ${currentConditionsObj.sunset}</p>
  `;

  const forecast = document.createElement("div");
  forecast.classList.add("forecast");
  forecast.innerHTML = "<h3>5-Day Forecast</h3>";

  const list = document.createElement("ul");

  daysArr.slice(0, 5).forEach((day) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${day.datetime}</strong>: 
      ${day.tempmin}°C – ${day.tempmax}°C
      (${day.conditions || "—"})
    `;
    list.appendChild(li);
  });

  forecast.appendChild(list);

  weatherResult.appendChild(header);
  weatherResult.appendChild(current);
  weatherResult.appendChild(forecast);
};

btn.addEventListener("click", async () => {
  const location = input.value.trim();
  if (!location) {
    weatherResult.textContent = "Please enter a city.";
    return;
  }
  weatherResult.textContent = "Loading…";
  const dataObj = await getRelevantInfo(location);
  if (!dataObj) {
    weatherResult.textContent =
      "Error fetching weather. Check console for details.";
  } else {
    renderWeatherData(dataObj);
  }
});
