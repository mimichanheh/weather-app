const checkWeather = document.getElementById("check-weather")
const locationSection = document.getElementById("search-location")
const locationForm = document.getElementById("search-location-form")
const searchAnotherLocation = document.createElement("button")
async function locationWeather(location) {
    try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2F7EJWAYMDEXN9LU4SXNAYVLB`)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const locationData = await response.json()
    console.log(locationData)
    return locationData;
    } catch(err) {
        const errorMessage = document.getElementById("errorMessage")
        errorMessage.textContent = "This location does not xist in our database"
    }
}

function getLocation() {
    const locationInput = document.getElementById("location-text")
    return locationInput.value
}

async function displayLocation() {
    const locationData = await locationWeather(getLocation())
    console.log(locationData);
    const todayWeatherCard = document.createElement("div");
    const daysCardsContainer = document.createElement("div");
    const weatherConditions = document.createElement("h1");
    const weatherTemp = document.createElement("p");
    const weatherFeelslike = document.createElement("p");
    const weatherPrecip = document.createElement("p");
    const weatherIcon = document.createElement("img");
    const tempUnitList = document.getElementById("temp-unit")
    const text1 = document.createElement("p");
    const text2 = document.createElement("p");

    locationSection.innerHTML = ''
    locationSection.style.maxHeight = "max-content"
    locationSection.style.height = "auto"
    locationSection.style.padding = "2rem"
    
    daysCardsContainer.id = "daysCardsContainer"
    todayWeatherCard.id = "todayWeatherCard"
    weatherIcon.id = "weatherIcon"
    text1.id = "randomText"
    text2.id = "randomText"
    searchAnotherLocation.id = "searchAnotherLocation"

    text1.textContent = "Temperature today " + locationData.days[0].datetime + ", " + locationData.currentConditions.datetime + " in " + locationData.address
    text2.textContent = "Forecast for the next 14 days : "
    searchAnotherLocation.textContent = "Change the location"

    weatherConditions.textContent = locationData.currentConditions.conditions;
    weatherPrecip.textContent = `precipitaion : ${locationData.currentConditions.precipprob}`;
    const tempValue = tempUnitList.value;
    let convertedTempValue;
    let convertedFeelslikeValue;
    if(tempValue == "celcius") {
        convertedTempValue = (locationData.currentConditions.temp - 32)*(5/9)
        convertedFeelslikeValue = (locationData.currentConditions.feelslike - 32)*(5/9)
    } else {
        convertedTempValue = locationData.currentConditions.temp
        convertedFeelslikeValue = locationData.currentConditions.feelslike
    }
    weatherTemp.textContent = "temperature : " + convertedTempValue.toFixed(2);
    weatherFeelslike.textContent = "feels like : " + convertedFeelslikeValue.toFixed(2)
    if(locationData.currentConditions.conditions == "Clear") {
        weatherIcon.src = "day-forecast-hot-svgrepo-com.svg"
    } else if(locationData.currentConditions.conditions == "Partially cloudy") {
        weatherIcon.src = "cloudy-forecast-sun-svgrepo-com.svg"
    } else {
        weatherIcon.src = "climate-cloud-forecast-3-svgrepo-com.svg"
    }
    todayWeatherCard.appendChild(weatherIcon)
    todayWeatherCard.appendChild(weatherConditions)
    todayWeatherCard.appendChild(weatherTemp)
    todayWeatherCard.appendChild(weatherFeelslike)
    todayWeatherCard.appendChild(weatherPrecip)
    locationSection.appendChild(text1)
    locationSection.appendChild(todayWeatherCard)
    for(let i=1 ; i<15 ; i++) {
        const weatherCard = document.createElement("div");
        const weatherDayConditions = document.createElement("h1");
        const weatherDayTemp = document.createElement("p");
        const weatherDayFeelslike = document.createElement("p");
        const weatherDayPrecip = document.createElement("p");
        const weatherDayIcon = document.createElement("img");
        const dateSpan = document.createElement("span");
        const cardDateContainer = document.createElement("div")
        weatherCard.id = "todayWeatherCard"
        weatherDayIcon.id = "weatherIcon"
        cardDateContainer.id = "cardDateContainer"
        dateSpan.style.fontFamily = "Montserrat"
        weatherDayConditions.textContent = locationData.days[i].conditions;
        dateSpan.textContent = locationData.days[i].datetime;
        weatherDayPrecip.textContent = `precipitaion : ${locationData.days[i].precip}`;
        if(tempValue == "celcius") {
        convertedTempValue = (locationData.days[i].temp - 32)*(5/9)
        convertedFeelslikeValue = (locationData.days[i].feelslike - 32)*(5/9)
        } 
        weatherDayTemp.textContent = "temperature : " + convertedTempValue.toFixed(2);
        weatherDayFeelslike.textContent = "feels like : " + convertedFeelslikeValue.toFixed(2)
        if(locationData.days[i].conditions == "Clear") {
            weatherDayIcon.src = "day-forecast-hot-svgrepo-com.svg"
        } else if(locationData.days[i].conditions == "Partially cloudy") {
            weatherDayIcon.src = "cloudy-forecast-sun-svgrepo-com.svg"
        } else {
            weatherDayIcon.src = "climate-cloud-forecast-3-svgrepo-com.svg"
        }
        weatherCard.appendChild(weatherDayIcon)
        weatherCard.appendChild(weatherDayConditions)
        weatherCard.appendChild(weatherDayTemp)
        weatherCard.appendChild(weatherDayFeelslike)
        weatherCard.appendChild(weatherDayPrecip)
        cardDateContainer.appendChild(weatherCard);
        cardDateContainer.appendChild(dateSpan)
        daysCardsContainer.appendChild(cardDateContainer)
    }
    locationSection.appendChild(text2)
    locationSection.appendChild(daysCardsContainer)
    locationSection.appendChild(searchAnotherLocation)
}

searchAnotherLocation.addEventListener("click", () => {
    location.reload();
})

locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loadingGrid = document.createElement("div");
    setTimeout(() => {for(let j=0 ; j<4 ; j++) {
        let circle = document.createElement("div");
        circle.id = "circle"
        loadingGrid.id = "loadingGrid"
        loadingGrid.appendChild(circle)
        circle.style.gridColumn = `${j+1} / ${j+2}`
        locationSection.appendChild(loadingGrid);
    }}, 3000)
    displayLocation();
})