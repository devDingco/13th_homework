let 강아지이미지 = []
let 사진타이머 = null

const 사진불러오는기능 = () => {
  fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
    받아온결과.json().then((객체로변경한결과) => {
      // 강아지이미지 주소 배열
      강아지이미지 = 객체로변경한결과.message
      사진_필터링기능()
    })
    // 사진을 불러오지 못할 경우 에러처리
  }).catch((error) => {
    console.error("사진을 불러오는 중 오류가 발생했습니다", error)
  })
}


window.addEventListener("scroll", () => {
  const 사진보관함 = document.getElementById("사진_레이아웃")
  // 사진보관함이 block상태일 때만 실행하기
  if (사진보관함.style.display !== "block") return;

  const 스크롤퍼센트 = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
  if (스크롤퍼센트 < 0.7) return;
  if (사진타이머 !== null) return;

  console.log("스크롤을 검사합니다.")
  console.log("상자를 그려줍니다.")

  사진불러오는기능()

  사진타이머 = setTimeout(() => {
    사진타이머 = null

    const 마지막스크롤퍼센트 = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    if (마지막스크롤퍼센트 === 1) {
      사진불러오는기능()
    }
  }, 1000)
})

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

