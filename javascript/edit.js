window.onload = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 3. 일기목록에서 현재일기번호 가져오기
  const 일기담는통 = 일기목록[일기번호];

  // 4. 일기상세내용 화면에 그리기
  window.document.getElementById("HTML_일기수정제목입력창").value =
    일기담는통.제목;
  window.document.getElementById("HTML_일기수정내용입력창").value =
    일기담는통.내용;
  window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
    if (el.value === 일기담는통.기분) el.checked = true;
  });
};

const JS_수정완료하기기능 = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem("민지의일기목록") ?? "[]";
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 3. 변경된 일기 새로운 통에 담기
  const 수정된제목담는통 =
    window.document.getElementById("HTML_일기수정제목입력창").value;
  const 수정된내용담는통 =
    window.document.getElementById("HTML_일기수정내용입력창").value;
  let 수정된기분담는통;
  window.document.getElementsByName("HTML_기분선택버튼").forEach((el) => {
    if (el.checked) 수정된기분담는통 = el.value;
  });

  일기목록[일기번호] = {
    제목: 수정된제목담는통,
    내용: 수정된내용담는통,
    기분: 수정된기분담는통,
    작성일: 일기목록[일기번호].작성일,
  };
  window.localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

  // 4. 상세페이지로 돌아가기
  location.replace(`./detail.html?number=${일기번호}`);
};

const JS_수정취소기능 = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 상세페이지로 돌아가기
  window.location.replace(`./detail.html?number=${일기번호}`);
};
