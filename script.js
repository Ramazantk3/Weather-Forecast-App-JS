const button = document.querySelector(".searchBar button");
const searchBoxInput = document.querySelector(".searchBar input");
const weatherIcon = document.querySelector(".weatherIcon");

const checkweather = async (city) =>{
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=T3P38DDLAYGTKS7CKPDFL8TVV`
    const response = await fetch(apiUrl);
    let data = await response.json();

    UpdateWindRain(data);
    let weatherCondition = data.currentConditions.conditions;
    UpdateWeatherIcon(weatherCondition);



}

UpdateWindRain = (data) => {
    document.querySelector(".temp").innerHTML = data.currentConditions.temp + "°C";
    document.querySelector(".city").innerHTML = data.address;
    document.querySelector("p.wind").innerHTML = data.currentConditions.windspeed + " km/h";
    document.querySelector("p.rain").innerHTML = data.currentConditions.precipprob + "%";
}

UpdateWeatherIcon = (weatherCondition) => {
    if(weatherCondition.includes("Partially cloudy")) weatherIcon.src="images/partially-cloudy.png";
    else if(weatherCondition.includes("Clear")) weatherIcon.src="images/clear.png" ;
    else if (weatherCondition.includes("Overcast")) weatherIcon.src="images/cloudy.png" 
    else if (weatherCondition.includes("Rain")) weatherIcon.src="images/rainy.png" 
}



//MAIN
checkweather("Istanbul"); //As default;
button.addEventListener("click", ()=>{
    checkweather(searchBoxInput.value);
})

searchBoxInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkweather(searchBoxInput.value);
    }
});
