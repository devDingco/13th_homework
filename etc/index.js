// - [ ]  JS: 일기등록
//     - [ ]  배열에 객체로 일기 push하여 등록할 수 있게 해주세요.
// 1.전역변수에 빈배열 선언, 변수 이름은 일기 목록
const 일기목록 = [];
// 2. 등록하기라는 버튼을 눌렀을 때 일기추가하기라는 함수 실행
document.getElementById("등록하기버튼").addEventListener("click", () => {});

// 3. 일기 추가하기는 함수가 하는 일
const 일기추가하기 = () => {
  const 날짜박스 =
    날짜입력값.year() + (날짜입력값.month() + 1) + 날짜입력값.date();
  const 제목박스 = document.getElementById("html_제목박스").value;
  const 내용박스 = document.getElementById("html_내용박스").value;
  console.log(일기추가하기);
};
// 3-1. 일기 추가하기는 입력값 받아오기
const 날짜 = new Date();
const 날짜입력값 = {
  year: Date.getfullYear,
  month: Date.getmonth,
  date: Date.getdate,
};

// 3-2. 새로운 객체를 만들어서 일기목록에 추가하기는
const 새일기목록 = 일기목록.push;
// 3-3. 일기목록 다시 그리기

// - [ ]  JS: 일기목록
//     - [ ]  일기등록시 일기목록에 마지막 순서로 추가되게 해주세요.
// 1. 일기목록 배열에 푸쉬를 달아서 마지막 순서로 오게 만든다
// 2. 일기목록을 담은 함수를 만든다
// 3. 일기목록 함수에 푸쉬 메서드를 사용한다

// - [ ]  JS: 일기상세
//     - [ ]  일기목록에서 카드 클릭하면 alert으로 상세 정보를 보여주세요.
// 1. 상세정보를 보여주는 변수를 선언, 변수 이름은 상세정보상자
// 2. 상세정보상자라는 변수에 제목 기분상태 내용 담기
// 3. 클릭하는 기능 상세정보보기기능이라는 함수에 넣어서 만들기
// 4.  상세정보보기기능 함수 실행
