function fetchWeatherDataBucharest() {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bucharest?unitGroup=us&key=UWYE9TZNLDLF2G4FMR7PPBCU4&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}

function fetchWeatherDataParis() {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Paris?unitGroup=us&key=UWYE9TZNLDLF2G4FMR7PPBCU4&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}

function fetchWeatherDataNewYork() {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=us&key=UWYE9TZNLDLF2G4FMR7PPBCU4&contentType=json",
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
}

fetchWeatherDataBucharest();
fetchWeatherDataParis();
fetchWeatherDataNewYork();

async function getRelevantInfo(cityName) {
    let data = '';
    switch(cityName) {
        case 'Bucharest':
            data = fetchWeatherDataBucharest();
            break;
        case 'Paris':
            data = fetchWeatherDataParis();
            break;
        case 'New York':
            data = fetchWeatherDataNewYork();
            break;
    }
    
}
