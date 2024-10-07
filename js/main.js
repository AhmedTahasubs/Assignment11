let todayName = document.getElementById("today-name")
let todayNum = document.getElementById("today-num")
let month = document.getElementById("month")
let todayLocation = document.getElementById("today-location")
let todayTemp = document.getElementById("today-temp")
let todayPng = document.getElementById("today-png")
let todayInfo = document.getElementById("today-info")
let humidity = document.getElementById("humidity")
let windSpeed = document.getElementById("wind-speed")
let windDirection =document.getElementById("wind-direction")
let tomTempMax = document.getElementsByClassName("tom-temp-max")
let tomTempMin = document.getElementsByClassName("tom-temp-min")
let tomText = document.getElementsByClassName("tom-text")
let tomPng = document.getElementsByClassName("tompng")
let tomDay = document.getElementsByClassName("tom-day")
let searchInput = document.getElementById("search")
async function search(cityName){
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=85fd0e6d30d94a5e8ee174654240410&q=${cityName}&days=3`);
    let a = await t.json();
    return a;
}
async function startApp(city="cairo")
{
    let weatherData = await search(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}
startApp()
searchInput.addEventListener("input", function(){
    startApp(searchInput.value)
})
function displayTodayData(data){
    let todaydate = new Date()
    todayName.innerHTML = todaydate.toLocaleDateString("en-Us",{weekday:"long"})
    todayNum.innerHTML = todaydate.getDate()
    month.innerHTML = todaydate.toLocaleString("en-Us",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayPng.setAttribute("src","https:"+data.current.condition.icon)
    todayInfo.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    windSpeed.innerHTML = data.current.wind_kph
    windDirection.innerHTML = data.current.wind_dir
} 
function displayNextData(data){
    let forecastData = data.forecast.forecastday
    for(let i=0;i<2;i++)
    {
        let tomdata = new Date(forecastData[i+1].date)
        tomDay[i].innerHTML = tomdata.toLocaleDateString("en-Us",{weekday:"long"})
        tomTempMax[i].innerHTML = forecastData[i+1].day.maxtemp_c
        tomTempMin[i].innerHTML = forecastData[i+1].day.mintemp_c
        tomText[i].innerHTML = forecastData[i+1].day.condition.text
        tomPng[i].setAttribute("src","https:"+forecastData[i+1].day.condition.icon)
    }
}







