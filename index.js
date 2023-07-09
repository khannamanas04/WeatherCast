
//giving some defaults
let defaultCity = "Los Angeles";
let units = "metric";

//Getting selector
let city = document.querySelector(".city");
//for date and time
let dt = document.querySelector(".data");
function convertTime(timestamp,timezone){
    const conv = timezone/3600; //converting seconds to hours
    const date = new Date(timestamp*1000);
    const options = {
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric',
        hour:'numeric',
        timezone:`Etc/GMT${conv >= 0 ? "-" : "+"}${Math.abs(conv)}`,
        hour12:true,
    };
    return date.toLocaleString("en-US",options);
}

let forecast = document.querySelector(".forecast");
let img = document.querySelector(".img");
let temperature = document.querySelector(".temp");
let minmax = document.querySelector(".minmax");
let realfeel = document.querySelector(".realfeel");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");


//refer stackoverflow
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"],{type:"region"});
    return regionNames.of(country);
}

//Searching 
document.querySelector(".search").addEventListener('submit',event=>{
    const search = document.querySelector(".formsearch");
    event.preventDefault();
    //changing the city value
    defaultCity = search.value;
    getWeather();
    //Reseting the form 
    search.value="";
});

//To change units of temperature
document.querySelector(".celsius").addEventListener("click",()=>{
    if(units!=="metric"){
        units = "metric";
        getWeather();
    }
});
document.querySelector(".fahrenheit").addEventListener("click",()=>{
    if(units!=="imperail"){
        units = "imperial";
        getWeather();
    }
})



function getWeather(){
    const mixweatherlonglat = ["97e9","330","6e022","ac09","c3c","929db","ed44","1658"];
    const entry = mixweatherlonglat[3]+mixweatherlonglat[7]+mixweatherlonglat[0]+mixweatherlonglat[1]+mixweatherlonglat[5]+mixweatherlonglat[2]+mixweatherlonglat[4]+mixweatherlonglat[6];

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${entry}&units=${units}`).then(res=>res.json())
    .then(data=>{
        console.log(data);
        city.innerHTML=`${data.name}, ${convertCountryCode(data.sys.country)}`;
        dt.innerHTML = convertTime(data.dt,data.timezone);
        forecast.innerHTML = `<p>${data.weather[0].main}`;
        temperature.innerHTML = `${data.main.temp.toFixed()}&#176`; //toFixed() method is being used to round off the temo to nearest whole integer
        img.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
        minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
        realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed}${units==="imperial" ? "mph" :"m/s"}`;
        pressure.innerHTML =`${data.main.pressure} hPa`
        
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+data.name+"')";
    })
}

document.addEventListener('load',getWeather());