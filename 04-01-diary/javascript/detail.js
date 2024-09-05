// 주소에서 일기번호 가져오기 통일 함수
const getDiaryNumber = () => {
  const querystring = window.location.search;
  const number_container = new URLSearchParams(querystring);
  return number_container.get("number");
}

// 작성 날짜 포맷팅
const getFormattedDate = () => {
  const date = new Date();

  // 년도, 월, 일을 포맷팅
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `[${year}. ${month}. ${day}]`;
};

// 댓글을 화면에 표시하는 함수
const showComments = (comments) => {
  const commentsSection = document.getElementById("show_comment");
  if (!commentsSection) {
    console.error('댓글 섹션을 찾을 수 없습니다.');
    return;
  }
  
  commentsSection.innerHTML = comments.map(comment => 
    `<div class="show_comment">${comment.text} <span style="font-size: 0.8em; color: #888;">${comment.date}</span></div>`
  ).join("");
};


window.onload = () => {
    const diary_number = getDiaryNumber();
    
    // 2. 스토리지에 저장된 일기목록 가져오기
    const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);
  
    // 3. 일기목록에서 현재일기번호 가져오기
    if (!diary_list[diary_number]) {
      console.error('해당 일기를 찾을 수 없습니다.');
      return;
    }

    const diary_container = diary_list[diary_number];
  
    let 기분 = diary_container.기분;
    let mood_message;
    switch (기분) {
      case "happy":
        mood_message = "행복해요";
        imgsrc = "./assets/happy-imoji.png";
        color = "#EA5757";
        break;
      case "sad":
        mood_message = "슬퍼요";
        imgsrc = "./assets/sad-imoji.png";
        color = "#28B4E1";
        break;
      case "surprise":
        mood_message = "놀랐어요";
        imgsrc = "./assets/surprise-imoji.png";
        color = "#D59029";
        break;
      case "angry":
        mood_message = "화나요";
        imgsrc = "./assets/angry-imoji.png";
        color = "#777";
        break;
      default:
        mood_message = "기타";
        imgsrc = "./assets/etc-imoji.png";
        color = "#A229ED";
        break;
    }
  
    // 4. 일기상세내용 화면에 그리기
    window.document.getElementById("title_details").innerHTML =
      diary_container.제목;
    window.document.getElementById("show_mood").innerHTML =
      mood_message;
    window.document.getElementById("show_mood").style.color =
      color;
    window.document.getElementById("content_details").innerHTML =
      diary_container.내용;
    window.document.getElementById("mood_image").src = imgsrc;
    window.document.getElementById("mood_image").alt = mood_message;
    window.document.getElementById("show_date").innerHTML =
      diary_container.작성일;


    // 페이지 로드 시 댓글 표시
    if (diary_container.comments) {
      showComments(diary_container.comments);
    }; 
  };


  const JS_regist = () => {
    const diary_number = getDiaryNumber();
    const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);
  
    const comment_text = document.getElementById("type_comment").value;
    const comment_date = getFormattedDate();
  
    if (!diary_list[diary_number].comments) {
      diary_list[diary_number].comments = [];
    }
  
    // 댓글 객체로 저장
    diary_list[diary_number].comments.push({ text: comment_text, date: comment_date });
    window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));
  
    showComments(diary_list[diary_number].comments);
    document.getElementById("type_comment").value = "";
  };

  

  const JS_edit = () => {
    const diary_number = getDiaryNumber();
    window.location.href = `./edit.html?number=${diary_number}`;
  };


  const JS_delete = () => {
    const diary_number = getDiaryNumber();
    const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);

    diary_list.splice(diary_number, 1);
    window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));
    alert("삭제되었습니다.");

    window.location.href = `./main.html`;
  };

  
  // const JS_edit = () => {
  //   // 1. 주소에서 일기번호 가져오기
  //   const querystring = window.location.search;
  //   const number_container = new URLSearchParams(querystring);
  //   const diary_number = number_container.get("number");
  
  //   // 2. 수정페이지로 이동하기
  //   window.location.href = `./edit.html?number=${diary_number}`;
  // };

  // // 삭제
  // const JS_delete = () => {
  //   // 1. 주소에서 일기번호 가져오기
  //   const querystring = window.location.search;
  //   const number_container = new URLSearchParams(querystring);
  //   const diary_number = number_container.get("number");

    
  //   // 2. 일기 삭제 후 팝업 안내
  //   const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  //   const diary_list = JSON.parse(storage_diary);

  //   diary_list.splice(diary_number, 1);

  //   window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));
  //   alert("삭제되었습니다.");
  
  //   // 3. 메인페이지로 이동하기
  //   window.location.href = `./main.html`;
  // };


  // // 댓글 입력
  // const JS_regist = () => {

  //   // 1. 주소에서 일기번호 가져오기
  //   const querystring = window.location.search;
  //   const number_container = new URLSearchParams(querystring);
  //   const diary_number = number_container.get("number");
  
  //   // 2. 스토리지에 저장된 일기목록 가져오기
  //   const storage_diary = window.localStorage.getItem("list_of_diary") ?? "[]";
  //   const diary_list = JSON.parse(storage_diary);
  
  //   // 3. 작성된 댓글을 가져오기
  //   const comment_container = window.document.getElementById("type_comment").value;

  //   // 4. 댓글을 해당 일기 데이터에 추가하기
  //   if (!diary_list[diary_number].comments) {
  //       diary_list[diary_number].comments = [];
  //   }
  
  //   diary_list[diary_number].comments.push(comment_container);
  
  //   // 5. 변경된 일기 목록 다시 저장
  //   window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));
  
  //   // 6. 댓글을 화면에 다시 그리기
  //   showComments(diary_list[diary_number].comments);
  
  //   // 7. 댓글 입력 필드 비우기
  //   window.document.getElementById("type_comment").value = "";
  // };
 
  
  // // 댓글을 화면에 표시하는 함수
  // const showComments = (comments) => {
  //   const commentsSection = document.getElementById("show_comment");
  //   commentsSection.innerHTML = comments.map(comment => `<p>${comment}</p>`).join("");
  // };

   
  