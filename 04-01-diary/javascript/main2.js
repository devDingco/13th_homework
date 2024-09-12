window.onload = () => {
    console.log("민지의 다이어리에 오신 것을 환영합니다.");

   // 초기 로드 시 기본 레이아웃으로 이미지 로드
  fetch("https://dog.ceo/api/breeds/image/random/10").then((result) => {
    result.json().then((changeResult) => {
      const images = changeResult.message;
      currentLayout = "basic"; // 기본 레이아웃 설정

      images.forEach(image => {
        document.getElementById("basic_image").innerHTML +=
          `<img src="${image}" style="object-fit: cover; aspect-ratio: 1/1; width: 300px; border-radius: 1rem;" />`;
      });
    });
  });
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


// 사진 api 드롭다운
const JS_dropdown = (event) => {
  const choose = event.target.id; // 선택된 레이아웃의 id를 사용
  currentLayout = choose; // 선택된 레이아웃 저장

  // 드롭다운을 클릭하여 선택 상태를 토글합니다.
  document.getElementById("html_dropdown_title").click();

  // 선택된 레이아웃에 맞게 이미지를 로드합니다.
  fetch("https://dog.ceo/api/breeds/image/random/10").then((result) => {
    result.json().then((changeResult) => {
      const images = changeResult.message;

      // 모든 이미지 영역 비우기
      document.getElementById("basic_image").innerHTML = "";
      document.getElementById("row_image").innerHTML = "";
      document.getElementById("column_image").innerHTML = "";

      // 선택된 레이아웃에 맞는 이미지 추가
      switch (currentLayout) {
        case "basic": {
          images.forEach(image => {
            document.getElementById("basic_image").innerHTML +=
              `<img src="${image}" style="object-fit: cover; aspect-ratio: 1/1; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
        case "row": {
          images.forEach(image => {
            document.getElementById("row_image").innerHTML +=
              `<img src="${image}" style="object-fit: cover; aspect-ratio: 4/3; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
        case "column": {
          images.forEach(image => {
            document.getElementById("column_image").innerHTML +=
              `<img src="${image}" style="object-fit: cover; aspect-ratio: 3/4; width: 300px; border-radius: 1rem;" />`;
          });
          break;
        }
        default: {
          console.error("알 수 없는 레이아웃: ", currentLayout);
          break;
        }
      }
    });
  });
};



// 무한스크롤 (10개 단위, 스로틀링)
let loading = false; // API 호출 여부를 확인하는 변수

const JS_puppy = (layout) => {
  if (loading) return;
  loading = true;

  fetch("https://dog.ceo/api/breeds/image/random/10").then((result) => {
    result.json().then((changeResult) => {
      const images = changeResult.message;

      if (layout === "basic" && document.getElementById("basic_image")) {
        images.forEach(image => {
          document.getElementById("basic_image").innerHTML +=
            `<img src="${image}" style="object-fit: cover; aspect-ratio: 1/1; width: 300px; border-radius: 1rem;" />`;
        });
      }

      if (layout === "row" && document.getElementById("row_image")) {
        images.forEach(image => {
          document.getElementById("row_image").innerHTML +=
            `<img src="${image}" style="object-fit: cover; aspect-ratio: 4/3; width: 300px; border-radius: 1rem;" />`;
        });
      }

      if (layout === "column" && document.getElementById("column_image")) {
        images.forEach(image => {
          document.getElementById("column_image").innerHTML +=
            `<img src="${image}" style="object-fit: cover; aspect-ratio: 3/4; width: 300px; border-radius: 1rem;" />`;
        });
      }

      loading = false; // API 호출 종료
    }).catch(() => {
      loading = false; // 에러 발생 시 초기화
    });
  });
};


// 무한 스크롤 및 스로틀링
let timer = null;
window.addEventListener("scroll", () => {
  const scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  if (scrollPercent < 0.9) return;
  if (timer) return;

  JS_puppy(currentLayout);

  timer = setTimeout(() => {
    timer = null;
    const lastScrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    if (lastScrollPercent >= 0.9) {
      JS_puppy(currentLayout);
    }
    }, 1000);
  });