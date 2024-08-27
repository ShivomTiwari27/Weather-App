const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "fb46154479e85382a3dbccc02c5e7dfd"; 
let imgs = document.createElement("img");

weatherForm.addEventListener("submit", async event =>{

  event.preventDefault();

  const city = cityInput.value;

  if(city){
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
    
  }
  else{
    displayError("Please enter a city");
  }
});

async function getWeatherData(city){
  
 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 const response = await fetch(apiUrl);
 
 if(!response.ok){

  throw new Error("Could not fetch weather data");

 }
 return await response.json();
}

function displayWeatherInfo(data){
  const {name: city, 
         main:{temp, humidity}, 
         sys:{sunrise,sunset},dt,
         weather:[{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const sunrises = sunrise ;
  const sunsets = sunset ;
  const liveDate = dt ;

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent= `humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  imgs.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
  card.appendChild(imgs);
  console.log(liveDate);
}

function getWeatherEmoji(weatherId,sunrise,sunset,liveDate){
  
  switch(true){            
                                      
    case (weatherId >= 200 && weatherId <300):                   //Thunderstorm
      if(liveDate >= sunrise && liveDate <= sunset){
        imgs.src = `./images/11d.png`
      }
      else{
        imgs.src = `./images/11n.png`
      }
    return;
    
    case (weatherId >= 300 && weatherId <400):                  //Drizzle
      if(liveDate >= sunrise && liveDate <= sunset){
        imgs.src = `./images/09d.png`
      }
      else{
        imgs.src = `./images/09n.png`
      }
    return ;

    case (weatherId >= 500 && weatherId <504):                 //Rain
      if(liveDate >= sunrise && liveDate <= sunset){
        imgs.src = `./images/10d.png`
      }
      else{
        imgs.src = `./images/10n.png`
      }
    return ;
    
    case (weatherId === 504 ):                                //Freezing Rain
        imgs.src = `./images/13d.png`  
    return ;

    case (weatherId >= 511 && weatherId <532):                 //Shower Rain
    if(liveDate >= sunrise && liveDate <= sunset){
      imgs.src = `./images/09d.png`
    }
    else{
      imgs.src = `./images/09n.png`
    }
  return ;

    case (weatherId >= 600 && weatherId <700):                   // Snow
      imgs.src = `./images/13d.png`
    return ;

    case (weatherId >= 700 && weatherId <800):                  // Mist
    imgs.src = './images/50d.png'
    return ;

    case (weatherId === 800 ):                                 // Clear Sky
      if(liveDate >= sunrise && liveDate <= sunset){
        imgs.src = `./images/1d.png`
      }
      else{
        imgs.src = `./images/1n.png`
      }
    return ;

    case (weatherId === 801 ):                                //Few Clouds
    if(liveDate >= sunrise && liveDate <= sunset){
      imgs.src = `./images/2d.png`
    }
    else{
      imgs.src = `./images/2n.png`
    } 
    return ;

    case (weatherId === 802 ):                                //scattered clouds
    if(liveDate >= sunrise && liveDate <= sunset){
      imgs.src = `./images/03d.png`
    }
    else{
      imgs.src = `./images/03n.png`
    } 
    return ;

    case (weatherId >= 803 && weatherId <810):               // Clouds

      if(liveDate >= sunrise && liveDate <= sunset){
        imgs.src = `./images/04d.png`
      }
      else{
        imgs.src = `./images/04n.png`
      }
    return ;

    default:
      return "❓";
    
  }
}

function displayError(message){

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent= "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);

}