
const 감정목록 = ["행복해요", "슬퍼요", "놀랐어요", "화나요", "기타"]
const 감정사진 = ["./images/행복해요.png", "./images/슬퍼요.png", "./images/놀랐어요.png", "./images/화나요.png", "./images/기타.png"]
const 감정색깔 = ["color: #EA5757", "color: #28B4E1", "color: #D59029", "color:#777777", "color:#A229ED"]

window.onload = () => {

  const 스토리지에저장된일기목록 = localStorage.getItem("일기항목") ?? "[]"
  let 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 스크롤
  window.addEventListener("scroll", () => {
    const 스크롤내려간길이 = window.scrollY
    if (스크롤내려간길이 > 0) {
      document.getElementById("필터").style = "background-color: black; color: white"
    } else {
      document.getElementById("필터").style = "background-color: white color: black"
    }
  })
  console.log(일기목록)
  일기DOM만들기();
}

const 일기목록 = [];

const 일기등록기능 = () => {
  모달열기기능("일기등록완료모달");
  const 오늘날짜 = new Date();
  const 작성날짜 = `${오늘날짜.getFullYear()}-${오늘날짜.getMonth() + 1}-${오늘날짜.getDate()}`;

  const 감정 = document.querySelector('input[name="기분"]:checked').value

  const 제목 = document.getElementById("제목인풋").value
  const 내용 = document.getElementById("내용인풋").value
  // let 회고 = []

  let 감정사진선택 = 감정사진[4] // 감정사진 초기
  let 감정색깔선택 = 감정색깔[4] // 감정색깔 초기

  for (let 반복 = 0; 반복 < 감정목록.length; 반복 = 반복 + 1) {
    if (감정 === 감정목록[반복]) {
      감정사진선택 = 감정사진[반복]
      감정색깔선택 = 감정색깔[반복]
    }
  }
  // 일기항목 객체를 생성
  const 일기항목 = {
    감정: 감정,
    제목: 제목,
    내용: 내용,
    날짜: 작성날짜,
    감정사진: 감정사진선택,
    감정색깔: 감정색깔선택,
  }

  const 스토리지에저장된일기목록 = localStorage.getItem("일기항목") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  일기목록.push(일기항목)
  localStorage.setItem("일기항목", JSON.stringify(일기목록));

  일기DOM만들기();
}


let 필터링한일기 = [];

const 필터링기능 = (event) => {
  const 선택한내용 = event.target.value;

  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목") ?? "[]";
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)


  switch (선택한내용) {
    case "행복선택":
      필터링한일기 = 일기목록_변환.filter(el => el.감정 === "행복해요")
      break;
    case "슬픔선택":
      필터링한일기 = 일기목록_변환.filter(el => el.감정 === "슬퍼요")
      break;
    case "놀람선택":
      필터링한일기 = 일기목록_변환.filter(el => el.감정 === "놀랐어요")
      break;
    case "화남선택":
      필터링한일기 = 일기목록_변환.filter(el => el.감정 === "화나요")
      break;
    case "기타선택":
      필터링한일기 = 일기목록_변환.filter(el => el.감정 === "기타")
      break;
    default:
      필터링한일기 = 일기목록_변환
  }
  일기DOM만들기();

  // localStorage.setItem("일기항목", JSON.stringify(필터링한일기))
  console.log(필터링한일기)

  let 새로운_일기목록만들기 = 필터링한일기.map(
    (일기, index) =>
      `<a class="일기_항목" href="./detail.html?diary=${index}">
          <div class="일기_사진">
              <div class="감정_사진" style="background: url(${일기.감정사진})  lightgray 50% / cover no-repeat"></div>
          </div>
          <div class="일기_내용"> 
            <div class="일기_항목_감정">${일기.감정}</div>
            <div class="일기_항목_날짜">${일기.날짜}</div>
          </div>
          <div class="일기_항목_제목">${일기.제목}</div>
          <img src="./images/close icon.png" class= "삭제_버튼" onclick="일기삭제버튼기능(event, ${index}); 모달열기기능('일기삭제확인모달')"/>
      </a>
        `
  ).join("")
  window.document.getElementById("일기추가할공간").innerHTML = 새로운_일기목록만들기
}

const 일기클릭기능 = (index) => {
  const 일기정보 = 일기목록[index]
  alert(`제목: ${일기정보.제목}
  내용: ${일기정보.내용}
  감정: ${일기정보.감정}
`)
}

let 로컬스토리_일기_삭제후 = [];

let 삭제할일기번호;

const 일기삭제버튼기능 = (event, 삭제할일기번호) => {
  event.preventDefault();
  모달열기기능('일기삭제확인모달')
  // console.log(삭제할일기번호)
  삭제할일기번호 = 삭제할일기번호
}

const 일기삭제기능 = () => {
  console.log("here")
  const 로컬스토리_일기_문자열 = localStorage.getItem("일기항목")
  const 로컬스토리_일기 = JSON.parse(로컬스토리_일기_문자열)

  console.log(로컬스토리_일기);
  console.log(삭제할일기번호);

  로컬스토리_일기_삭제후 = 로컬스토리_일기.filter((_, index) => index !== 삭제할일기번호);
  console.log(로컬스토리_일기_삭제후);

  localStorage.setItem("일기항목", JSON.stringify(로컬스토리_일기_삭제후))
  일기DOM만들기()
}

const 일기DOM만들기 = () => {
  // 로컬스토리지에서 일기목록 가져오기
  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목") ?? "[]"
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)

  let 일기목록만들기 = 일기목록_변환.map(
    (일기, index) =>
      `<a class="일기_항목" href="./detail.html?diary=${index}">
            
            <div class="일기_사진" style="background: url(${일기.감정사진})  lightgray 50% / cover no-repeat"></div>
            
            <img src="./images/close icon.png" class= "삭제_버튼" onclick="일기삭제버튼기능(event, ${index})"/>

            <div class="일기_내용"> 
              <div class="일기_항목_감정">${일기.감정}</div>
              <div class="일기_항목_날짜">${일기.날짜}</div>
            </div>
            <div class="일기_항목_제목">${일기.제목}</div>
          </a>
        `
  ).join("")
  window.document.getElementById("일기추가할공간").innerHTML = 일기목록만들기
}

window.addEventListener("scroll", () => {
  const 화면위에서푸터위까지길이 = document.getElementById("푸터").getBoundingClientRect().top
  // console.log(`화면위에서푸터위까지 길이: ${화면위에서푸터위까지길이}`)

  // window.outerHeight 메뉴, 주소창 등 포함
  const 보이는화면길이 = window.innerHeight
  // console.log(`보이는화면길이: ${보이는화면길이}`)
  if (보이는화면길이 >= 화면위에서푸터위까지길이) {
    document.getElementById("탑스크롤버튼").style = `
      position: relative;
      bottom: 30px;
      left: 94%

    `
  } else {
    document.getElementById("탑스크롤버튼").style = `
      position: fixed;
      right: 30px;
      bottom: 30px;
    `
  }
})
const 탑스크롤기능 = () => {
  // const 스크롤할부분 = document.getElementById("일기추가할공간")
  // 스크롤할부분.scrollTo({ top: 0 })
  window.scrollTo({ top: 0 })
}

const 모달열기기능 = (모달종류) => {
  document.getElementById(모달종류).style = "display: block"
  탑스크롤기능()
  document.body.style = "overflow: hidden"
}

const 모달닫기기능 = (모달종류) => {
  document.getElementById(모달종류).style = "display: none"
  document.body.style = "overflow: scroll"
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // 라디오버튼도 추가해주기
    if (document.activeElement.id === "제목인풋" || document.activeElement.id === "내용인풋") {
      모달닫기기능("일기등록모달")
    }
  }
})

const 탭선택기능 = (탭) => {
  if (탭 === "일기보관함탭") {
    document.getElementById('일기_레이아웃').style = "display: block"
    document.getElementById('사진_레이아웃').style = "display: none"

    document.getElementById("일기보관함탭").className = "선택_탭"
    document.getElementById("사진보관함탭").className = "비선택_탭"
  } else if (탭 === "사진보관함탭") {
    document.getElementById('일기_레이아웃').style = "display: none"
    document.getElementById('사진_레이아웃').style = "display: block"

    document.getElementById("일기보관함탭").className = "비선택_탭"
    document.getElementById("사진보관함탭").className = "선택_탭"

    사진불러오는기능()
  }

}

const 드롭다운선택기능 = (event) => {
  // event.target => 이벤트가 있는 태그 전체 가져오기 (input 태그 전체)
  console.log(event.target.id)
  document.getElementById("드롭다운_제목").style.cssText = `--필터선택변수: "${event.target.id}"`
  // 드롭다운 제목을 강제로 선택에서 드롭다운 메뉴 닫아주기
  document.getElementById("드롭다운_제목").click()
}

const 다크모드기능 = (event) => {
  if (event.target.checked === true) {
    // document.body.className = "CSS_불꺼진방"
    document.documentElement.setAttribute("모드", "다크모드")
  } else {
    document.documentElement.removeAttribute("모드")
  }
}