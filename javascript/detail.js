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

  let 기분 = 일기담는통.기분;
  let 기분메시지;
  switch (기분) {
    case "행복":
      기분메시지 = "행복해요";
      이미지경로 = "./assets/images/joy-imoji.png";
      글자색 = "#EA5757";
      break;
    case "슬픔":
      기분메시지 = "슬퍼요";
      이미지경로 = "./assets/images/sadness-imoji.png";
      글자색 = "#28B4E1";
      break;
    case "놀람":
      기분메시지 = "놀랐어요";
      이미지경로 = "./assets/images/surprised-imoji.png";
      글자색 = "#D59029";
      break;
    case "화남":
      기분메시지 = "화나요";
      이미지경로 = "./assets/images/anger-imoji.png";
      글자색 = "#777";
      break;
    default:
      기분메시지 = "기타";
      이미지경로 = "./assets/images/idontknownothing-imoji.png";
      글자색 = "#A229ED";
      break;
  }

  // 4. 일기상세내용 화면에 그리기
  window.document.getElementById("HTML_일기상세제목보여주는곳").innerHTML =
    일기담는통.제목;
  window.document.getElementById("HTML_일기기분보여주는곳").innerHTML =
    기분메시지;
  window.document.getElementById("HTML_일기기분보여주는곳").style.color =
    글자색;
  window.document.getElementById("HTML_일기상세내용보여주는곳").innerHTML =
    일기담는통.내용;
  window.document.getElementById("HTML_기분이미지보여주는곳").src = 이미지경로;
  window.document.getElementById("HTML_기분이미지보여주는곳").alt = 기분메시지;
  window.document.getElementById("HTML_날짜보여주는곳").innerHTML =
    일기담는통.작성일;
};

const JS_수정하러가기기능 = () => {
  // 1. 주소에서 일기번호 가져오기
  const 쿼리스트링 = window.location.search;
  const 잘게나누어담은통 = new URLSearchParams(쿼리스트링);
  const 일기번호 = 잘게나누어담은통.get("number");

  // 2. 수정페이지로 이동하기
  window.location.href = `./edit.html?number=${일기번호}`;
};
