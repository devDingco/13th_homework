const JS_모달열기기능 = (모달종류) => {
  window.document.getElementById(모달종류).style = "display: block";
  window.scrollTo({
    top: 0,
  });
  document.body.style.overflow = "hidden";
};

const JS_모달닫기기능 = (모달종류) => {
  window.document.getElementById(모달종류).style = "display: none";
  document.body.style.overflow = "auto";
};

// 언제든지 ESC 누르면 모달 전체 다 닫기
window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    const 공통모달그룹목록 =
      window.document.getElementsByClassName("CSS_공통모달그룹");

    for (let i = 0; i < 공통모달그룹목록.length; i++) {
      const 모달 = 공통모달그룹목록.item(i);
      모달.style = "display: none";
    }
  }
});

window.addEventListener("keyup", () => {
  // 일기쓰기 제목, 내용이 모두 있는지 확인
  const 제목담는통 = window.document.getElementById("HTML_제목입력창");
  const 내용담는통 = window.document.getElementById("HTML_내용입력창");
  if (제목담는통 && 내용담는통) {
    const 등록하기버튼 = document.getElementById("HTML_등록하기버튼");
    if (제목담는통.value !== "" && 내용담는통.value !== "") {
      등록하기버튼.disabled = false;
    } else if (제목담는통.value === "" || 내용담는통.value === "") {
      등록하기버튼.disabled = true;
    }
  }
});
