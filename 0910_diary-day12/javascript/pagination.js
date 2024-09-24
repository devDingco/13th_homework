

// const 보여줄갯수 = 2;
// const 버튼의갯수 = diarydata / 보여줄갯수; //8/2

//1. 페이지 번호 보여일 개수 나열하기
// const diarydata = JSON.parse(localStorage.getItem("민지의일기목록") || "[]");

// // const diarydata = localStorage.getItem("민지의일기목록")
// window.onload = () => {
//   JS_일기그리기기능()
//   const 내용상자 = new Array(5).fill("영희")
//   console.log(내용상자)
  
//   const pages = 내용상자.map((el, index) => {
//     return `<button>${index + 1}</button>`
//   }).join(" ")
//   console.log(pages)
  
//   document.getElementById("html_페이지번호보여줄곳").innerHTML = pages
// }

// 2. 이전, 다음 버튼 만들기

// let 시작페이지 = 1

// const js_페이지그리기기능 = () => {
//   const 내용상자 = new Array(5).fill("영희")
//   console.log(내용상자)
  
  
//   const pages = 내용상자.map((el, index) => {
//     return `<button>${index + 시작페이지}</button>`
//   }).join(" ")
//   console.log(pages)
  
//   document.getElementById("html_페이지번호보여줄곳").innerHTML = pages
// }

// const js_이전페이지이동기능 = () => {
//   시작페이지 = 시작페이지 - 5
//   js_페이지그리기기능()
// }

// const js_다음페이지이동기능 = () => {
//   시작페이지 = 시작페이지 + 5
//   js_페이지그리기기능()
// }

// window.onload = () => {
//   JS_일기그리기기능()
//   js_페이지그리기기능()
// }


//3. 마지막 만든 개수까지만 올림으로 페이지 뜨게하기
// const diarydata = JSON.parse(localStorage.getItem("민지의일기목록") || "[]");

// // const diarydata = localStorage.getItem("민지의일기목록")
// console.log(diarydata)
// let 시작페이지 = 1;
// const 마지막페이지 = Math.ceil(diarydata.length / 2);
// console.log("마지막페이지::", 마지막페이지);

// const js_이전페이지이동기능 = () => {
//   if(시작페이지 === 1){
//     alert("더이상 넘길 수 없습니다.")

//   } else {
//     시작페이지 = 시작페이지 - 5
//     js_페이지그리기기능()
//   }
// }

// const js_다음페이지이동기능 = () => {
//   if(시작페이지 + 5 <= 마지막페이지){
//     시작페이지 = 시작페이지 + 5
//     js_페이지그리기기능()
//   } else {
//     alert ("마지막페이지번호를 넘어갑니다. 이제 내용이 없습니다.")
//   }
// }

// const js_페이지그리기기능 = () => {
//   JS_일기그리기기능()
//   const 내용상자 = new Array(5).fill("영희")
//   console.log(내용상자)
  
//   const pages = 내용상자.map((el, index) => {
//     const 페이지번호 = index + 시작페이지
//     return 페이지번호 <= 마지막페이지 ? `<button>${페이지번호}</button>` : ""
//   }).join(" ")
//   console.log(pages)
  
//   document.getElementById("html_페이지번호보여줄곳").innerHTML = pages
// }




// window.onload = () => {
  
//   // JS_일기그리기기능()
//   js_페이지그리기기능()
// }



// 1번페이지번호를 누르면 0,1 담기고
// 2번페이지번호를 누르면 2,3 담기고
// 3번페이지번호를 누르면 4,5 담겨야한다.
// // 앞에 2개를 건너뛰고 나머지 2개를 보여주는 식을 세워야한다.
// // 건너뛸개수 = (클릭한페이지-1) * 보여줄갯수


// diarydata 변수에 로컬 스토리지에서 가져온 데이터를 JSON 형태로 저장.
// 만약 로컬 스토리지에 데이터가 없으면 빈 배열로 설정.
const diarydata = JSON.parse(localStorage.getItem("민지의일기목록") || "[]");

console.log(diarydata)

// 시작페이지는 1로 기본값 설정.
let 시작페이지 = 1;

// 마지막페이지는 일기 데이터 전체 개수를 2로 나눈 후, 올림하여 계산. (페이지 당 2개씩 표시하기 때문)
const 마지막페이지 = Math.ceil(diarydata.length / 2);
console.log("마지막페이지::", 마지막페이지);

// **이전 페이지로 이동하는 기능**
const js_이전페이지이동기능 = () => {
  // 현재 페이지가 1이면 더 이상 이동할 수 없다고 경고.
  if(시작페이지 === 1){
    alert("더이상 넘길 수 없습니다.")
    
  } else {
    // 시작 페이지를 5씩 감소시켜 이전 페이지로 이동.
    시작페이지 = 시작페이지 - 5;
    // 페이지 그리기 및 일기 목록을 갱신하는 함수를 호출.
    js_페이지그리기기능();
    js_페이지당일기나눠서보여주기기능(시작페이지);
  }
}

// **다음 페이지로 이동하는 기능**
const js_다음페이지이동기능 = () => {
  // 만약 시작 페이지가 마지막 페이지를 초과하지 않는다면 이동 가능.
  if(시작페이지 + 5 <= 마지막페이지){
    // 시작 페이지를 5씩 증가시켜 다음 페이지로 이동.
    시작페이지 = 시작페이지 + 5;
    // 페이지 그리기 및 일기 목록을 갱신하는 함수를 호출.
    js_페이지그리기기능();
    js_페이지당일기나눠서보여주기기능(시작페이지);
  } else {
    // 마지막 페이지를 초과하면 경고.
    alert ("마지막페이지번호를 넘어갑니다. 이제 내용이 없습니다.");
  }
}

// **페이지 번호 버튼을 그리는 기능**
const js_페이지그리기기능 = () => {
  // 5개의 페이지 번호를 담을 상자를 생성. "영희"라는 이름으로 임시로 채움.
  const 내용상자 = new Array(5).fill("영희");
  console.log(내용상자);

  // 페이지 상자를 순회하며 버튼 HTML을 생성.
  const pages = 내용상자.map((el, index) => {
    const 페이지번호 = index + 시작페이지; // 페이지 번호를 시작 페이지부터 계산.

    // 페이지 번호가 마지막 페이지 이하일 때만 버튼 생성.
    return 페이지번호 <= 마지막페이지 ? `<button onclick= "js_페이지당일기나눠서보여주기기능(${페이지번호})">${페이지번호}</button>` : "";
  }).join(" "); // 버튼들을 문자열로 이어서 HTML로 표현.
  
  console.log(pages);
  
  // 생성한 버튼들을 특정 HTML 요소에 삽입.
  document.getElementById("html_페이지번호보여줄곳").innerHTML = pages;
}

// **페이지에 따라 일기를 나눠서 보여주는 기능**
const js_페이지당일기나눠서보여주기기능 = (페이지번호) => {
  // 페이지 번호가 정의되지 않은 경우 기본값으로 시작 페이지 사용.
  if (페이지번호 === undefined) 페이지번호 = 시작페이지;
  console.log("페이지번호",페이지번호);

  // 보여줄 일기의 갯수는 2개로 설정.
  const 보여줄갯수 = 2;
  
  // 현재 페이지 번호에서 건너뛸 일기의 개수를 계산. (페이지번호 - 1) * 보여줄갯수.
  const 건너뛸갯수 = (페이지번호 - 1) * 보여줄갯수;
 
  // 해당 페이지 번호에 따라 보여줄 일기 목록 필터링.
  const 결과 = diarydata.filter((el, index) => {
    if(건너뛸갯수 <= index && index < 건너뛸갯수 + 보여줄갯수) {
      return true; // 조건에 맞는 일기만 결과에 포함.
    } else {
      return false; // 조건에 맞지 않으면 제외.
    }
  });

  console.log("페이지네이션 함수안에서 결과::::::",결과);
  
  // 필터링된 결과를 화면에 그리는 함수를 호출.
  JS_일기그리기기능(결과);
}

// **초기 로드 시 페이지 그리기 및 첫 페이지 일기 표시**
window.onload = () => {
  js_페이지그리기기능(); // 페이지 버튼을 그림.
  js_페이지당일기나눠서보여주기기능(); // 첫 번째 페이지의 일기 목록을 표시.
}


