const 쿼리스트링 = location.search // 넘어온 문자열 받아서 저장
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링) // 스트링 쪼개주기
const 일기_번호 = 잘게나누어담은통.get("diary");
console.log(일기_번호);

const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지) // 객체배열
console.log(일기목록_변환)

const 선택_일기 = 일기목록_변환[일기_번호]; // 선택한 일기 객체
console.log(선택_일기)

window.onload = () => {
  // 선택된 일기 내용 가져와서 인풋에 넣어주기
  document.getElementsByName("기분").forEach(el => {
    console.log(el)
    if (el.value === 선택_일기.감정) el.checked = true;
  })

  // 선택_일기.감정
  document.getElementById("제목인풋").value = 선택_일기.제목;
  document.getElementById("내용인풋").value = 선택_일기.내용;
  회고목록그리기();
}

const 취소버튼기능 = () => {
  window.location.href = `./detail.html?diary=${일기_번호}`;
}

const 수정하기버튼기능 = () => {
  let 수정된_감정;

  document.getElementsByName("기분").forEach((el) => {
    if (el.checked) 수정된_감정 = el.value;
  })

  선택_일기.감정 = 수정된_감정;
  const 수정된_제목 = document.getElementById("제목인풋").value;
  const 수정된_내용 = document.getElementById("내용인풋").value;

  let 수정된_감정사진;
  let 수정된_감정색깔;

  switch (수정된_감정) {
    case "행복해요":
      수정된_감정사진 = "./images/행복해요.png",
        수정된_감정색깔 = "color: #EA5757"
      break;
    case "슬퍼요":
      수정된_감정사진 = "./images/슬퍼요.png",
        수정된_감정색깔 = "color: #28B4E1"
      break;
    case "놀랐어요":
      수정된_감정사진 = "./images/놀랐어요.png",
        수정된_감정색깔 = "color: #D59029"
      break;
    case "화나요":
      수정된_감정사진 = "./images/화나요.png",
        수정된_감정색깔 = "color: #777777"
      break;
    case "기타":
      수정된_감정사진 = "./images/기타.png",
        수정된_감정색깔 = "color: #A229ED"
  }

  // 수정된 객체 다시 만들어주기
  일기목록_변환[일기_번호] = {
    감정: 수정된_감정,
    제목: 수정된_제목,
    내용: 수정된_내용,
    날짜: 선택_일기.날짜,
    감정사진: 수정된_감정사진,
    감정색깔: 수정된_감정색깔,
    index: Number(일기_번호)
  }

  localStorage.setItem("일기항목", JSON.stringify(일기목록_변환));
  window.location.href = `./detail.html?diary=${일기_번호}`;
}

const 회고목록그리기 = () => {
  const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
  const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)
  const 선택_일기 = 일기목록_변환[일기_번호]

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