const input = document.querySelector('#city-input');
const btn = document.querySelector('#get-weather-btn');
const apiKey = "UWYE9TZNLDLF2G4FMR7PPBCU4";

async function fetchWeatherLocation(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&contentType=json&unitGroup=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
} 

async function getRelevantInfo(cityName) {
    try {
        const data =  await fetchWeatherLocation(cityName);;
        const dataObj = new Object({
            location: data.resolvedAddress,
            currentConditionsObj: data.currentConditions,
            daysArr: data.days,
            description: data.description,
        });
        return dataObj;
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', () => {
    const location = input.value;
    const dataObj = getRelevantInfo(location);

    console.log(dataObj);
});
