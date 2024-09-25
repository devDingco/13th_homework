const 쿼리스트링 = location.search // 넘어온 문자열 받아서 저장
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링) // 스트링 쪼개주기
const 일기번호 = 잘게나누어담은통.get("diary");
console.log(일기번호);

const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지) // 객체배열
console.log(일기목록_변환)

const 선택_일기 = 일기목록_변환[일기번호]; // 선택한 일기 객체
console.log(선택_일기)

window.onload = () => {
  회고목록그리기()
  let 이미지경로;

  switch (선택_일기.감정) {
    case "행복해요":
      이미지경로 = "./images/joy-imoji.png"
      break;
    case "슬퍼요":
      이미지경로 = "./images/sadness-imoji.png";
      break;
    case "놀랐어요":
      이미지경로 = "./images/surprised-imoji.png";
      break;
    case "화나요":
      이미지경로 = "./images/anger-imoji.png";
      break;
    case "기타":
      이미지경로 = "./images/idontknownothing-imoji.png";
  }

  document.getElementById("감정_미니사진").src = 이미지경로
  document.getElementById("타이틀").innerText = 선택_일기.제목
  document.getElementById("감정").innerText = 선택_일기.감정
  document.getElementById("날짜").innerText = 선택_일기.날짜
  document.getElementById("내용").innerText = 선택_일기.내용
}

const 수정버튼기능 = () => {
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("diary");

  // 2. 수정페이지로 이동하기
  window.location.href = `./edit.html?diary=${일기번호}`;
}

const 삭제버튼기능 = () => {
  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지) // 객체배열

  let 로컬스토리_일기_삭제후 = [];

  로컬스토리_일기_삭제후 = 일기목록_변환.filter((_, index) =>
    index !== parseInt(일기번호)
  )


  localStorage.setItem("일기항목", JSON.stringify(로컬스토리_일기_삭제후))
  alert("삭제되었습니다✔️")
  window.location.href = "./index.html"
}
// 회고목록: [{회고내용: "", 회고잘석날짜: ""}, {...}] 이런식으로

const 회고입력기능 = () => {
  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)
  const 선택_일기 = 일기목록_변환[일기번호]

  let 회고목록;

  if ("회고목록" in 선택_일기) {
    회고목록 = 선택_일기.회고목록
  } else {
    회고목록 = []
  }
  // 회고내용 있으면 가져오고 없으면 빈 배열로 초기화


  const 오늘날짜 = new Date();
  const 회고작성날짜 = `${오늘날짜.getFullYear()} -${오늘날짜.getMonth() + 1} -${오늘날짜.getDate()} `;

  회고내용 = document.getElementById("회고인풋").value;
  회고내용객체 = { 회고내용: 회고내용, 회고작성날짜: 회고작성날짜 }
  회고목록.push(회고내용객체);

  일기목록_변환[일기번호].회고목록 = 회고목록;

  localStorage.setItem("일기항목", JSON.stringify(일기목록_변환))
  회고목록그리기();
}

const 회고목록그리기 = () => {
  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)
  const 선택_일기 = 일기목록_변환[일기번호]

  const 회고리스트 = 선택_일기.회고목록 ?? "[]"

  console.log("회고리스트", 회고리스트)
  if (회고리스트 !== "[]") {
    let 회고넣기 = 회고리스트.map(
      (회고) =>
        `<div class="회고_댓글_영역">
            <div class="회고_댓글">${회고.회고내용}</div>
            <div class="회고_날짜">[${회고.회고작성날짜}]</div>
          </div>
  `
    ).join("")
    window.document.getElementById("회고넣어줄부분").innerHTML = 회고넣기;
  }

  // console.log("회고넣기", 회고넣기)

}

const 내용복사기능 = () => {
  const 내용 = document.getElementById("내용").innerText
  navigator.clipboard.writeText(내용)
  document.getElementById("토스트_감싸기").style = "display: block"

  window.setTimeout(() => {
    document.getElementById("토스트_감싸기").style = "display: none"
  }, 1000)
}

