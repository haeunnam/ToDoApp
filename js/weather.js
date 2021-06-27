const API_KEY = 'fa58c8b46851457a2924bc9fe56d6a78'
const COORDS ="coords"


function loadCoords() {
  const loadedCoords =localStorage.getItem(COORDS)
  if (loadedCoords == null) {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
  } else {
    const parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.lat, parsedCoords.lon)
  }
}

function saveCoords(CoordsObj) {
  localStorage.setItem(COORDS,JSON.stringify(CoordsObj))
}

function getWeather(lat, lon){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then(response => response.json())
    .then(data =>{
      const weather = document.querySelector('#weather span:first-child')
      const city = document.querySelector('#weather span:last-child')
      weather.innerText = `${data.weather[0].main} ${Math.round(data.main.temp)}℃`
      city.innerText = data.name
  })
}

function onGeoOk(position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const coordsObj = {
    lat,
    lon,
  }
  getWeather(lat, lon)
  saveCoords(coordsObj)
}

function onGeoError() {
  alert("Can't find you. No weather for you")
}

loadCoords()