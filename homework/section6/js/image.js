let 강아지이미지 = []

const 사진불러오는기능 = () => {

  fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
    받아온결과.json().then((객체로변경한결과) => {
      // 강아지이미지 주소 배열
      강아지이미지 = 객체로변경한결과.message
      사진_필터링기능()
    })
  })
}

// const 사진그려주는기능 = () => {
//   document.getElementById("사진추가할공간").innerHTML = 강아지이미지.map(el => `
//     <img src="${el}" id="사진타입" class="사진_기본형" />
//     `).join("")
// }

const 사진_필터링기능 = () => {
  const 선택된타입 = document.getElementById("사진_필터").value

  switch (선택된타입) {
    case "기본선택":
      document.getElementById("사진추가할공간").innerHTML = 강아지이미지.map(el => `
      <img src="${el}" id="사진타입" class="사진_기본형" />
      `).join("")
      break;
    case "가로선택":
      document.getElementById("사진추가할공간").innerHTML = 강아지이미지.map(el => `
      <img src="${el}" id="사진타입" class="사진_가로형" />
      `).join("")
      break;
    case "세로선택":
      document.getElementById("사진추가할공간").innerHTML = 강아지이미지.map(el => `
      <img src="${el}" id="사진타입" class="사진_세로형" />
      `).join("")
      break;
  }
}

