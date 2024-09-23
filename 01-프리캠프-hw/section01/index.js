let 타이머; // 전역 변수로 타이머 선언. clearInterval() 함수에서 사용됨
let 수강생카운트 = 0; // 추가된 수강생 수

// 알림창 표시 함수
function 알림창() {
  // 필수 입력 필드 목록 정의
  const 필수필드 = ["이름", "이메일", "비밀번호", "전화번호"];
  const 누락된필드 = [];

  // 각 필수 필드를 순회하며 입력 여부 확인
  for (const 필드 of 필수필드) {
    if (!document.getElementById(필드).value.trim()) {
      누락된필드.push(필드);
    }
  }

  // 누락된 필드가 있을 경우 알림 표시
  if (누락된필드.length > 0) {
    alert(`다음 필드를 반드시 입력해야 합니다: ${누락된필드.join(", ")}`);
    return; // 함수 실행 중단
  }

  // 각 입력 필드에서 값을 가져오고, 비어있을 경우 빈 문자열로 설정
  const 이름 = document.getElementById("이름").value.trim() || "";
  const 이메일 = document.getElementById("이메일").value.trim() || "";
  const 비밀번호 = document.getElementById("비밀번호").value;
  const 전화번호 = document.getElementById("전화번호").value.trim() || "";
  const 자기소개 = document.getElementById("자기소개").value.trim() || "";

  // 성별 라디오 버튼 처리. 선택되지 않았을 경우 "남성"으로 기본 설정
  const 성별라디오 = document.querySelector('input[name="gender"]:checked');
  const 성별 = 성별라디오 ? 성별라디오.value : "남성";

  // 동의 체크박스 처리. 체크 여부와 관계없이 항상 "Y"로 설정
  const agreement = document.getElementById("agreement").checked ? "Y" : "Y";

  // 비밀번호를 별표로 가리기
  const 가린비밀번호 = 비밀번호 ? "*".repeat(비밀번호.length) : "";

  // 전화번호 가운데 부분을 별표로 가리기
  let 가린전화번호 = 전화번호;
  if (전화번호.includes("-")) {
    const 전화번호부분 = 전화번호.split("-");
    if (전화번호부분.length === 3) {
      가린전화번호 = `${전화번호부분[0]}-****-${전화번호부분[2]}`;
    }
  }

  // 현재 날짜를 가입일시로 설정
  const 날짜 = new Date();
  const 가입일시 = `${날짜.getFullYear()}-${String(
    날짜.getMonth() + 1
  ).padStart(2, "0")}-${String(날짜.getDate()).padStart(2, "0")}`;

  // 알림창에 표시할 메시지 구성
  const 메시지 = `
    이름 : ${이름}
    이메일 : ${이메일}
    비밀번호 : ${가린비밀번호}
    성별 : ${성별}
    전화번호 : ${가린전화번호}
    동의여부 : ${agreement}
    자기소개 : ${자기소개}
    (가입일시 : ${가입일시})
  `;

  // 알림창으로 메시지 표시
  alert(메시지);

  // 수강생 추가 실행
  수강생추가();
}

// 수강생 프로필 누르면 환영합니다 알림창 뜨기
function 수강생축하() {
  // 현재 날짜를 가입일시로 설정
  const 날짜 = new Date();
  const 가입일시 = `${날짜.getFullYear()}-${String(
    날짜.getMonth() + 1
  ).padStart(2, "0")}-${String(날짜.getDate()).padStart(2, "0")}`;

  // 알림창에 표시할 메시지 구성
  const 메시지 = `
   회원가입을 축하합니다.
   (가입일시 : ${가입일시})
  `;

  // 알림창으로 메시지 표시
  alert(메시지);
}

// 수강생 프로필 추가 함수
function 수강생추가() {
  // 수강생 카운트 증가
  수강생카운트++;

  // 수강생 프로필 HTML을 생성
  const 수강생프로필 = document.createElement("button");
  수강생프로필.className = "가입하기후_수강생프로필추가";
  수강생프로필.onclick = 수강생축하;
  수강생프로필.innerHTML = `
    <img src="./assets/프로필 이미지 (export 하세요).png" alt="수강생 프로필">
    <span class="추가된수강생이름">수강생 ${수강생카운트}</span>
  `;

  const 가입안내 = document.getElementById("가입안내");
  const 수강생목록 = document.getElementById("수강생목록");
  const 가입하기버튼 = document.getElementById("가입하기버튼");

  // 첫 번째 수강생이 추가될 때 안내 메시지와 가입 버튼 숨기기
  if (수강생카운트 === 1) {
    가입안내.style.display = "none";
    가입하기버튼.style.display = "none";
  }

  // 수강생 프로필을 화면에 추가
  수강생목록.appendChild(수강생프로필);
}

// 6자리 인증번호 생성 및 표시 함수
function 인증번호() {
  // 0부터 999999 사이의 랜덤 숫자 생성
  const 랜덤숫자 = Math.floor(Math.random() * 1000000);

  // 생성된 숫자를 6자리 문자열로 변환 (앞에 0 채우기)
  const 인증번호 = String(랜덤숫자).padStart(6, "0");

  // 생성된 인증번호를 화면에 표시
  document.getElementById("인증번호").innerText = 인증번호;

  // 인증번호 요소 활성화
  document.getElementById("인증번호").disabled = false;
}

// 3분 카운트다운 타이머 함수
function 인증타이머() {
  clearInterval(타이머); // 기존 타이머 초기화

  // 타이머 텍스트 색상을 빨간색으로 설정하고 초기값 "03:00" 표시
  document.getElementById("인증타이머").style.color = "red";
  document.getElementById("인증타이머").innerText = "03:00";

  let 시간 = 180; // 3분

  타이머 = setInterval(() => {
    if (시간 <= 0) {
      // 시간이 다 되면 타이머 중지 및 "00:00" 표시
      clearInterval(타이머);
      document.getElementById("인증타이머").innerText = "00:00";

      // 인증하기 버튼 이미지 변경
      const 인증하기버튼 = document.getElementById("인증하기버튼");
      if (인증하기버튼) {
        인증하기버튼.querySelector("img").src = "./assets/button_primary.png";
      }
      return;
    }

    시간 -= 1;
    // 남은 시간을 분과 초로 변환하여 표시
    const 분 = String(Math.floor(시간 / 60)).padStart(2, "0");
    const 초 = String(시간 % 60).padStart(2, "0");

    document.getElementById("인증타이머").innerText = `${분}:${초}`;
  }, 1000); // 1초마다 실행
}

// 인증번호 생성 및 타이머 시작 함수
function 인증시작() {
  인증번호();
  인증타이머();
}

// 인증 완료 처리 함수
function 인증완료버튼() {
  clearInterval(타이머); // 타이머 중지

  // 타이머 텍스트 숨김
  const 타이머요소 = document.getElementById("인증타이머");
  if (타이머요소) {
    타이머요소.style.display = "none";
  }

  // 인증하기 버튼 이미지 변경
  const 인증버튼 = document.getElementById("인증하기버튼");
  if (인증버튼) {
    인증버튼.querySelector("img").src = "./assets/button_primary.png";
  }
}

// 입력 필드 변경 시 유효성 검사 및 버튼 활성화 함수
function 인풋필드추가() {
  // 각 입력 필드의 값을 가져와 유효성 검사
  const 이름 = document.getElementById("이름").value.trim() !== "";
  const 이메일 = document.getElementById("이메일").value.trim();
  const 비밀번호 = document.getElementById("비밀번호").value;
  const 비밀번호확인 = document.getElementById("비밀번호확인").value;
  const 전화번호 = document.getElementById("전화번호").value.trim();
  const 자기소개 = document.getElementById("자기소개").value.trim() !== "";
  const 남성 = document.getElementById("male").checked;
  const 여성 = document.getElementById("female").checked;
  const agreement = document.getElementById("agreement").checked;

  const 성별 = 남성 || 여성;

  // 비밀번호와 전화번호 유효성 검사
  const 비밀번호유효 = /^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/.test(비밀번호);
  const 전화번호유효 = /^010-\d{3,4}-\d{4}$/.test(전화번호);

  // 이메일 유효성 검사
  const 이메일유효 = 이메일유효성검사(이메일);

  // 모든 필드가 유효한 경우 가입 버튼 활성화
  if (
    이름 &&
    이메일유효 &&
    비밀번호유효 &&
    비밀번호 === 비밀번호확인 &&
    전화번호유효 &&
    자기소개 &&
    성별 &&
    agreement
  ) {
    // 모두 다 채웠을 때
    document.getElementById("활성화된가입버튼").innerHTML = `
      <button onclick="가입처리()">
        <img src="./assets/가입하기.png" id="활성화된가입버튼"/>
      </button>
    `;
  } else {
    // 모두 다 채우지 못 했을 때
    document.getElementById("활성화된가입버튼").innerHTML = `
      <button onclick="가입처리()">
        <img src="./assets/가입버튼.png" id="활성화된가입버튼"/>
      </button>
    `;
  }

  // 이메일 유효성 메시지 표시
  const 이메일메시지 = document.getElementById("이메일메시지");
  if (이메일메시지) {
    if (이메일 === "") {
      이메일메시지.textContent = "";
    } else if (!이메일유효) {
      이메일메시지.textContent = "유효하지 않은 이메일 주소입니다.";
      이메일메시지.style.color = "red";
    } else {
      이메일메시지.textContent = "유효한 이메일 주소입니다.";
      이메일메시지.style.color = "green";
    }
  }

  // 비밀번호 유효성 메시지 표시
  const 비밀번호메시지 = document.getElementById("비밀번호메시지");
  if (비밀번호메시지) {
    if (비밀번호 === "") {
      비밀번호메시지.textContent = "";
    } else if (!비밀번호유효) {
      비밀번호메시지.textContent =
        "비밀번호는 8자 이상, 영문 소문자, 특수문자를 포함해야 합니다.";
      비밀번호메시지.style.color = "red";
    } else {
      비밀번호메시지.textContent = "유효한 비밀번호입니다.";
      비밀번호메시지.style.color = "green";
    }
  }

  // 전화번호 유효성 메시지 표시
  const 전화번호메시지 = document.getElementById("전화번호메시지");
  if (전화번호메시지) {
    if (전화번호 === "") {
      전화번호메시지.textContent = "";
    } else if (!전화번호유효) {
      전화번호메시지.textContent =
        "전화번호는 010-0000-0000 형식이어야 합니다.";
      전화번호메시지.style.color = "red";
    } else {
      전화번호메시지.textContent = "유효한 전화번호입니다.";
      전화번호메시지.style.color = "green";
    }
  }
}

// 이메일 유효성 검사 함수
function 이메일유효성검사(이메일) {
  // @ 문자 확인
  if (!이메일.includes("@")) {
    return false;
  }

  // 이메일 주소를 @ 기준으로 분할
  const [아이디, 도메인] = 이메일.split("@");

  // 아이디와 도메인이 비어있지 않은지 확인
  if (아이디.length === 0 || 도메인.length === 0) {
    return false;
  }

  // 허용된 도메인 목록을 정의
  const 허용된도메인 = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"];

  // 도메인이 허용된 목록에 있는지 확인
  return 허용된도메인.includes(도메인);
}

// 비밀번호 일치 여부 확인 함수
function 유효성검사() {
  const 비밀번호 = document.getElementById("비밀번호").value;
  const 비밀번호확인 = document.getElementById("비밀번호확인").value;
  const 비밀번호확인메시지 = document.getElementById("비밀번호확인메시지");

  if (비밀번호확인메시지) {
    if (비밀번호확인 === "") {
      비밀번호확인메시지.textContent = "";
    } else if (비밀번호 === 비밀번호확인) {
      비밀번호확인메시지.textContent = "비밀번호가 일치합니다.";
      비밀번호확인메시지.style.color = "green";
    } else {
      비밀번호확인메시지.textContent = "비밀번호가 일치하지 않습니다.";
      비밀번호확인메시지.style.color = "red";
    }
  }

  인풋필드추가(); // 비밀번호 확인 후 전체 유효성 검사 실행
}

// 페이지 로드 시 이벤트 리스너 설정
window.onload = function () {
  //이메일 입력 필드에 이벤트 리스너 추가
  //document.getElementById("이메일").addEventListener("input", 인풋필드추가);

  // 비밀번호 입력 필드에 이벤트 리스너 추가
  document.getElementById("비밀번호").addEventListener("input", 인풋필드추가);

  // 비밀번호 확인 입력 필드에 이벤트 리스너 추가
  document.getElementById("비밀번호확인").addEventListener("input", 유효성검사);

  // 전화번호 입력 필드에 이벤트 리스너 추가
  document.getElementById("전화번호").addEventListener("input", 인풋필드추가);

  // 다른 필드들에도 이벤트 리스너 추가
  ["이름", "이메일", "자기소개"].forEach((id) => {
    document.getElementById(id).addEventListener("input", 인풋필드추가);
  });

  // 라디오 버튼과 체크박스에 이벤트 리스너 추가
  ["male", "female", "agreement"].forEach((id) => {
    document.getElementById(id).addEventListener("change", 인풋필드추가);
  });
};
