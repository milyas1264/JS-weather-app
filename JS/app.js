const apiKey = "ade7cdd361e52ae25f8bd5f0b5be2863";
const recentList = document.querySelector("#history");
const btn = document.querySelector("#search");
const input = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");
const loading = document.querySelector("#loading");

btn.addEventListener("click", function(){

const city = input.value;

getWeather(city);

});

async function getWeather(city){

  try{
  
  loading.style.display = "block";
  weatherDiv.innerHTML = "";
  
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  
  const data = await res.json();
  
  loading.style.display = "none";
  
  if(data.cod === "404"){
    weatherDiv.innerHTML = `
    <div class="card">
    <p style="color:red;">City not found ❌</p>
    </div>
    `;
  return;
  }
  
  showWeather(data);
  
  }catch(error){
  
  loading.style.display = "none";
  weatherDiv.innerHTML = "Error fetching data";
  
  }
  
  }

  function saveRecent(city){

    let recent = JSON.parse(localStorage.getItem("recent")) || [];
    
    if(!recent.includes(city)){
    recent.push(city);
    localStorage.setItem("recent", JSON.stringify(recent));
    }
    
    showRecent();
    
    }

    function showRecent(){

      const recent = JSON.parse(localStorage.getItem("recent")) || [];
      
      recentList.innerHTML = "";
      
      recent.forEach(function(city){
      
      recentList.innerHTML += `<li>${city}</li>`;
      
      });
      
      }

      recentList.addEventListener("click", function(e){

        if(e.target.tagName === "LI"){
        getWeather(e.target.innerText);
        }
        
        });

function showWeather(data){

  const icon = data.weather[0].icon;
  
  weatherDiv.innerHTML = `
  
  <h2>${data.name}</h2>
  
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
  
  <p id="temperature">Temperature: ${data.main.temp}°C</p>
  
  <p id="humidity">Humidity: ${data.main.humidity}%</p>
  <p id="wind">Wind: ${data.wind.speed} m/s</p>
  
  `;
  
  }

  showWeather(data);
saveRecent(city);

  input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
    getWeather(input.value);
    }
    
    });

    showRecent();