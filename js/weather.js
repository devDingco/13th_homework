// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_KEY = "f5ad8581946dc2430d971a2e11774214"

if (navigator.geolocation && localStorage.getItem("weatherData") === null) {
  navigator.geolocation.getCurrentPosition(showYourLocation, showErrorMsg, weatherSettingImgSet);
}


function weatherSettingImgSet(elt) {

}

// /* 비동기적으로 현재 위치를 알아내어 지정된 요소에 출력한다. */
// function whereami(elt) {
//   // 이 객체를 getCurrentPosition() 메서드의 세번째 인자로 전달한다.
//   var options = {
//     // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
//     // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다. 
//     enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값

//     // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자, 
//     // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
//     maximumAge: 30000,     // 5분이 지나기 전까지는 수정되지 않아도 됨

//     // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
//     // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
//     timeout: 15000    // 15초 이상 기다리지 않는다.
//   }

//   if (navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다. 
//     navigator.geolocation.getCurrentPosition(success, error, options);
//   else
//     elt.innerHTML = "이 브라우저에서는 Geolocation이 지원되지 않습니다.";


//   // geolocation 요청이 실패하면 이 함수를 호출한다.
//   function error(e) {
//     // 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
//     // 코드 값은 다음과 같다.
//     // 1: 사용자가 위치 정보를 공유 권한을 제공하지 않음.
//     // 2: 브라우저가 위치를 가져올 수 없음.
//     // 3: 타임아웃이 발생됨.
//     elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message;
//   }


//   // geolocation 요청이 성공하면 이 함수가 호출된다.
//   function success(pos) {

//     console.log(pos); // [디버깅] Position 객체 내용 확인

//     // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고, 
//     // 외부에서 가져오는 필드라는 점에 주의하다. 
//     var msg = "당신은 " +
//       new Date(pos.timestamp).toLocaleString() + "에 " +
//       " 위도 " + pos.coords.latitude +
//       " 경도 " + pos.coords.longitude + "에서 " +
//       " 약 " + pos.coords.accuracy + " 미터 떨어진 곳에 있습니다.";

//     // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
//     if (pos.coords.altitude) {
//       msg += " 당신은 해발 " + pos.coords.altitude + " ± " +
//         pos.coords.altitudeAccuracy + " 미터에 있습니다.";
//     }

//     // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
//     if (pos.coords.speed) {
//       msg += " 당신은 " + pos.coords.heading + " 방향으로 " +
//         "초속 " + pos.coords.speed + "(m/s)의 속도로 움직이고 있습니다.";
//     }

//     elt.innerHTML = msg;     // 모든 위치 정보를 출력한다.
//   }
// }

function showYourLocation(position) {
  // 성공했을때 실행 : 현재 위치값에 따른 날씨 데이터 호출
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;
  console.log(userLat, userLng);
  getWeather(userLat, userLng)
}

function showErrorMsg(error) { // 실패했을때 실행
  switch (error.code) {
    case error.PERMISSION_DENIED:
      loc.innerHTML = "이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!"
      break;

    case error.POSITION_UNAVAILABLE:
      loc.innerHTML = "이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!"
      break;

    case error.TIMEOUT:
      loc.innerHTML = "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
      break;

    case error.UNKNOWN_ERROR:
      loc.innerHTML = "이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!"
      break;
  }
}


const getWeather = async (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  ).then((res) => {
    return res.json()
  }).then((data) => {
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    const weatherData = [{ place: data.name, weatherIcon: iconUrl, weatherDesc: data.weather[0].description }]
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    // console.log(data)
  }).catch((error) => {
    console.log(error)
  })
}


// const weatherElement = (place, weatherIcon, weatherDesc) => {
//   const weatherWrap = document.querySelector('.weatherWrap');
//   if (!weatherWrap) return;
//   weatherWrap.innerHTML = `<div class="weather">
//     <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherIcon} 상징 아이콘" class="icon">
//     <div class="place">${place}</div>
//     <div class="description">${weatherDesc}</div>
//   </div>
//   `
// }