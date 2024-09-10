window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

    JS_filter('basic');
};

  // 스크롤 관련 이벤트
  window.addEventListener("scroll", () => {
    const TofooterHeight = document
      .getElementById("footer_section")
      .getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
  
    // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
    if (screenHeight >= TofooterHeight) {
      document.getElementById("floating_button").style = `
        position: relative;
        bottom: 0;
        left: 98%;
      `;
  
      // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
    } else {
      document.getElementById("floating_button").style = `
        position: fixed;
        bottom: 4rem;
        right: 2rem;
      `;
    }
  });



  // 스크롤 시 필터 색상 반전
window.onscroll = function () {
  const selectElement = document.querySelector(".filter");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // 2. 스크롤이 조금이라도 내려가면 배경색 변경하기
    selectElement.classList.add("change_color");
  } else {
    selectElement.classList.remove("change_color"); // 스크롤이 맨 위로 올라가면 원래 색으로
  }
};



  // 플로팅 버튼
  const JS_scroll = () => {
    
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  // 네비게이션 클릭
  const JS_click = (clicked) => {
    switch(clicked) {
        case "diary": {
          location.href = "./main.html"
            break;
        }
        case "photos": {
          location.href = "./main2.html"
            break;
        }
    }
}


// 사진 api
const JS_filter = (clicked) => {
  fetch("https://dog.ceo/api/breeds/image/random/10").then((result) => {
    result.json().then((changeResult) => {
      const images = changeResult.message; // 이미지 배열

      // 모든 이미지 영역 비우기
      document.getElementById("basic_image").innerHTML = "";
      document.getElementById("row_image").innerHTML = "";
      document.getElementById("column_image").innerHTML = "";

      // 선택된 필터에 맞는 영역에 이미지 추가

      switch(clicked) {
        case "basic": {
          images.forEach(image => {
            document.getElementById("basic_image").innerHTML += `<img src="${image}" style="object-fit: cover; aspect-ratio: 1/1; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
        case "row": {
          images.forEach(image => {
            document.getElementById("row_image").innerHTML += `<img src="${image}" style="object-fit: cover; aspect-ratio: 4/3; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
        case "column": {
          images.forEach(image => {
            document.getElementById("column_image").innerHTML += `<img src="${image}" style="object-fit: cover; aspect-ratio: 3/4; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
      }
    });
  });
}

