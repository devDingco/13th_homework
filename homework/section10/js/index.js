const 감정목록 = ["행복해요", "슬퍼요", "놀랐어요", "화나요", "기타"]
const 감정사진 = ["./images/행복해요.png", "./images/슬퍼요.png", "./images/놀랐어요.png", "./images/화나요.png", "./images/기타.png"]
const 감정색깔 = ["color: #EA5757", "color: #28B4E1", "color: #D59029", "color:#777777", "color:#A229ED"]

const 스토리지일기목록 = localStorage.getItem("일기항목") ?? "[]"
let 일기목록 = JSON.parse(스토리지일기목록);

let 시작페이지 = 1
let 클릭한페이지 = 1

let 필터링한일기 = 일기목록;
let 삭제할일기번호 = null;

let 타이머;

window.onload = () => {
  // window.addEventListener("scroll", () => {
  //   const 스크롤내려간길이 = window.scrollY
  //   if (스크롤내려간길이 > 0) {
  //     document.getElementById("드롭다운_제목").style = "background-color: black; color: white"
  //   } else {
  //     document.getElementById("드롭다운_제목").style = "background-color: white color: black"
  //   }
  // })

  페이지그리기기능(일기목록)
  페이지일기그리기기능(일기목록, 시작페이지)

  // 초기에 "전체" 드롭박스 체크해주기
  // document.getElementById("전체").checked = true
}

// 일기등록하기 인풋 검증
const 입력검사 = () => {
  const 제목입력 = document.getElementById("제목인풋").value;
  const 내용입력 = document.getElementById("내용인풋").value;
  const 등록버튼 = document.getElementById("등록하기버튼")

  console.log('제목입력', 제목입력)
  console.log('내용입력', 내용입력)

  // 모두 입력 한 경우
  if (제목입력.length > 0 && 내용입력.length > 0) {
    등록버튼.disabled = false;
    등록버튼.className = "등록하기_버튼"
  }
  // 모두 입력 안 한 경우
  else {
    등록버튼.disabled = true;
    등록버튼.className = "등록하기_버튼_비활"
  }
}

const 이전페이지이동기능 = () => {
  if (시작페이지 === 1) {
    alert("첫 페이지입니다 !")
    document.getElementById("이전페이지버튼")
  } else {
    시작페이지 = 시작페이지 - 5
    페이지그리기기능()
  }
}

const 다음페이지이동기능 = () => {
  if (시작페이지 + 5 <= 마지막페이지) {
    시작페이지 = 시작페이지 + 5
    페이지그리기기능()
  } else {
    alert("마지막페이지 입니다 !")
  }
}


const 페이지그리기기능 = (일기목록) => {
  const 마지막페이지 = Math.ceil(일기목록.length / 12)
  const 상자 = new Array(5).fill("그냥")

  const 페이지번호보여주는곳 = document.getElementById("페이지번호보여주는곳");
  페이지번호보여주는곳.innerHTML = '';

  상자.forEach((_, index) => {
    const 페이지번호 = index + 시작페이지;

    if (페이지번호 <= 마지막페이지) {
      const 버튼 = document.createElement("button");
      버튼.innerText = 페이지번호;
      버튼.className = 클릭한페이지 === 페이지번호 ? "페이지버튼_선택" : "페이지버튼"

      버튼.onclick = () => {
        페이지일기그리기기능(일기목록, 페이지번호);
        클릭한페이지 = 페이지번호;
        페이지그리기기능(일기목록)
      }

      페이지번호보여주는곳.appendChild(버튼)
    }
  })
}

const 페이지일기그리기기능 = (일기목록, 페이지번호담는통) => {
  if (일기목록.length === 0) {
    document.getElementById("일기추가할공간").innerHTML = "<div class='일기없을경우_박스'><div class='일기없을경우'>등록된 일기가 없습니다</div></div>"
    return
  }

  let 결과 = 일기목록.filter((_, index) => {
    // 한 페이지에 보여줄 일기 갯수
    const 보여줄갯수 = 12
    const 건너뛸갯수 = (페이지번호담는통 - 1) * 보여줄갯수

    if (건너뛸갯수 <= index && index < 건너뛸갯수 + 보여줄갯수) {
      return true
    } else {
      return false
    }
  })

  document.getElementById("일기추가할공간").innerHTML = 결과.map((일기) =>
    `<a class="일기_항목" href="./detail.html?diary=${일기.index}">
                
      <div class="일기_사진" style="background: url(${일기.감정사진})  lightgray 50% / cover no-repeat"></div>
      
      <img src="./images/close icon.png" class= "삭제_버튼" onclick="일기삭제버튼기능(event, ${일기.index}); 삭제할일기번호=${일기.index}"/>

      <div class="일기_내용"> 
        <div class="일기_항목_감정" style="${일기.감정색깔}">${일기.감정}</div>
        <div class="일기_항목_날짜">${일기.날짜}</div>
      </div>
      <div class="일기_항목_제목">${일기.제목}</div>
    </a>
    `
  ).join("")
}

const 일기등록기능 = () => {
  모달열기기능("일기등록완료모달");

  const 오늘날짜 = new Date();
  const 작성날짜 = `${오늘날짜.getFullYear()}-${오늘날짜.getMonth() + 1}-${오늘날짜.getDate()}`;

  const 감정 = document.querySelector('input[name="기분"]:checked').value

  const 제목 = document.getElementById("제목인풋").value
  const 내용 = document.getElementById("내용인풋").value

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

  일기목록.push(일기항목)
  // 객체에 원본인덱스 추가해주기
  일기목록 = 일기목록.map((일기, index) => ({ ...일기, index: index }));

  localStorage.setItem("일기항목", JSON.stringify(일기목록));

  //인풋창 초기화
  document.getElementById("제목인풋").value = ""
  document.getElementById("내용인풋").value = ""

  // 일기DOM만들기();
  페이지그리기기능(일기목록)
  페이지일기그리기기능(일기목록, 시작페이지)

  // 드롭다운 목록 전체로 바꿔주기
  document.getElementById("전체").checked = true
  // document.getElementById("드롭다운_메뉴").innerText = "전체"
}

const 드롭다운선택기능 = (event) => {
  // event.target => 이벤트가 있는 태그 전체 가져오기 (input 태그 전체)
  console.log(event.target.id)
  document.getElementById("드롭다운_제목").style.cssText = `--필터선택변수: "${event.target.id}"`
  // 드롭다운 제목을 강제로 선택에서 드롭다운 메뉴 닫아주기
  document.getElementById("드롭다운_제목").click()
}


const 필터링기능 = (event) => {
  const 선택한내용 = event.target.id;

  switch (선택한내용) {
    case "행복해요":
      필터링한일기 = 일기목록.filter(el => el.감정 === "행복해요")
      break;
    case "슬퍼요":
      필터링한일기 = 일기목록.filter(el => el.감정 === "슬퍼요")
      break;
    case "놀랐어요":
      필터링한일기 = 일기목록.filter(el => el.감정 === "놀랐어요")
      break;
    case "화나요":
      필터링한일기 = 일기목록.filter(el => el.감정 === "화나요")
      break;
    case "기타":
      필터링한일기 = 일기목록.filter(el => el.감정 === "기타")
      break;
    default:
      필터링한일기 = 일기목록
  }

  console.log('필터링한일기', 필터링한일기)

  페이지그리기기능(필터링한일기)
  페이지일기그리기기능(필터링한일기, 시작페이지)
}

const 검색기능 = (event) => {
  const 로컬스토리_일기_문자열 = localStorage.getItem("일기항목")
  const 로컬스토리_일기 = JSON.parse(로컬스토리_일기_문자열)

  clearTimeout(타이머)
  타이머 = setTimeout(() => {
    const 내가검색한단어 = event.target.value
    console.log(내가검색한단어)

    const 검색결과들 = 로컬스토리_일기.filter(일기 => 일기.제목.includes(내가검색한단어))
    console.log(검색결과들)

    let 새로운_일기목록만들기 = 검색결과들.map(
      (일기) =>
        `<a class="일기_항목" href="./detail.html?diary=${일기.index}">
            <div class="일기_사진">
                <div class="일기_사진" style="background: url(${일기.감정사진})  lightgray 50% / cover no-repeat"></div>
            </div>
            <div class="일기_내용"> 
              <div class="일기_항목_감정" style="${일기.감정색깔}">${일기.감정}</div>
              <div class="일기_항목_날짜">${일기.날짜}</div>
            </div>
            <div class="일기_항목_제목">${일기.제목}</div>
            <img src="./images/close icon.png" class= "삭제_버튼" onclick="일기삭제버튼기능(event, ${일기.index}); 모달열기기능('일기삭제확인모달'); 삭제할일기번호=${일기.index}"/>
        </a>
          `
    ).join("")
    window.document.getElementById("일기추가할공간").innerHTML = 새로운_일기목록만들기

  }, 1000)

}

// 일기삭제 모달 띄우기
const 일기삭제버튼기능 = (event) => {
  event.preventDefault();
  모달열기기능('일기삭제확인모달')
}

const 일기삭제기능 = () => {
  일기목록 = 일기목록.filter((일기) => 일기.index !== 삭제할일기번호);

  일기목록 = 일기목록.map((일기, index) => ({ ...일기, index: index }));

  localStorage.setItem("일기항목", JSON.stringify(일기목록))

  페이지그리기기능(일기목록)
  페이지일기그리기기능(일기목록, 시작페이지)
}

window.addEventListener("scroll", () => {
  const 화면위에서푸터위까지길이 = document.getElementById("푸터").getBoundingClientRect().top

  // window.outerHeight 메뉴, 주소창 등 포함
  const 보이는화면길이 = window.innerHeight

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

const 다크모드기능 = (event) => {
  if (event.target.checked === true) {
    document.documentElement.setAttribute("모드", "다크모드")
  } else {
    document.documentElement.removeAttribute("모드")
  }
}

