const 쿼리스트링 = location.search // 넘어온 문자열 받아서 저장
const 잘게나누어담은통 = new URLSearchParams(쿼리스트링) // 스트링 쪼개주기
const 일기_번호 = 잘게나누어담은통.get("diary");
console.log(일기_번호);

const 일기목록_로컬스토리지 = localStorage.getItem("일기항목");
const 일기목록_변환 = JSON.parse(일기목록_로컬스토리지)
console.log(일기목록_변환) // 객체배열

const 선택_일기 = 일기목록_변환[일기_번호];
console.log(선택_일기)

window.onload = () => {
  document.getElementById("초기_화면").style.display = "block";
  document.getElementById("수정_화면").style.display = "none";

  document.getElementById("타이틀").innerText = 선택_일기.제목
  document.getElementById("감정").innerText = 선택_일기.감정
  document.getElementById("날짜").innerText = 선택_일기.날짜
  document.getElementById("내용").innerText = 선택_일기.내용
}

const 수정버튼기능 = () => {
  document.getElementById("초기_화면").style.display = "none";
  document.getElementById("수정_화면").style.display = "block";

  // 초기 내용 가져와서 인풋에 넣어주기
  document.getElementById("제목인풋").value = 선택_일기.제목;
  document.getElementById("내용인풋").value = 선택_일기.내용;
}

const 취소버튼기능 = () => {
  document.getElementById("초기_화면").style.display = "block";
  document.getElementById("수정_화면").style.display = "none";
}

const 수정하기버튼기능 = () => {
  const 일기 = localStorage.getItem("일기항목");
  const 일기_변환 = JSON.parse(일기)

  console.log("선택일기", 선택_일기);

  document.getElementById("초기_화면").style.display = "block";
  document.getElementById("수정_화면").style.display = "none";

  일기목록_변환[일기_번호].제목 = document.getElementById("제목인풋").value;
  일기목록_변환[일기_번호].내용 = document.getElementById("내용인풋").value;

  console.log(일기목록_변환)

  localStorage.setItem("일기항목", JSON.stringify(일기목록_변환));
  document.getElementById("타이틀").innerText = 선택_일기.제목
  document.getElementById("감정").innerText = 선택_일기.감정
  document.getElementById("날짜").innerText = 선택_일기.날짜
  document.getElementById("내용").innerText = 선택_일기.내용
}
