const apiKey = "ade7cdd361e52ae25f8bd5f0b5be2863";

const btn = document.querySelector("#search");
const input = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");

btn.addEventListener("click", function(){

const city = input.value;

getWeather(city);

});

async function getWeather(city){

try{

const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

const data = await res.json();

if(data.cod === "404"){
weatherDiv.innerHTML = "City not found";
return;
}

showWeather(data);

}catch(error){

weatherDiv.innerHTML = "Error fetching data";

}

}

// function showWeather(data){

// weatherDiv.innerHTML = `

// <h2>${data.name}</h2>

// <p>Temperature: ${data.main.temp}°C</p>

// <p>Humidity: ${data.main.humidity}%</p>

// <p>Wind: ${data.wind.speed} m/s</p>

// `;

// }

function showWeather(data){

  const icon = data.weather[0].icon;
  
  weatherDiv.innerHTML = `
  
  <h2>${data.name}</h2>
  
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
  
  <p>Temperature: ${data.main.temp}°C</p>
  
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind: ${data.wind.speed} m/s</p>
  
  `;
  
  }
  input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
    getWeather(input.value);
    }
    
    });