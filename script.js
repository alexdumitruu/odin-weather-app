const apiKey = "UWYE9TZNLDLF2G4FMR7PPBCU4";

async function fetchWeatherLocation(location) {
    const url = fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}=json&unitGroup=metric`
  )
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
} 

async function getRelevantInfo(cityName) {
    try {
        const data =  await fetchWeatherLocation(cityName);
    
    } catch (error) {
        console.error(error);
    }
}
