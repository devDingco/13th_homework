// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_KEY = ""
const success = (position) => {
  // 현재 위치의 위도와 경도를 가져온다.
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 위도와 경도를 이용하여 날씨 정보를 가져온다.
  getWeather(latitude, longitude);
};

success()

const getWeather = async (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  ).then((res) => {
    const data = res.json()
    console.log(data);
    return;
  }).catch((error) => {
    console.log(error)
  })
}

// const tempSection = document.querySelector('.temperature');
// const placeSection = document.querySelector('.place');
// const descSection = document.querySelector('.description');


const weatherElement = () => {
  `
  <div class="weather">
    <div class="temperature">
      <span class="temp"></span>
      <span class="unit">°C</span>
    </div>
    <div class="place"></div>
    <div class="description"></div>
  </div>
  `
}