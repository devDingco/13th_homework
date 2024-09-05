window.onload = () => {
    // 1. 주소에서 일기번호 가져오기
    const querystring = window.location.search;
    const number_container = new URLSearchParams(querystring);
    const diary_number = number_container.get("number");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);
  
    // 3. 일기목록에서 현재일기번호 가져오기
    const diary_container = diary_list[diary_number];
  
    // 4. 일기상세내용 화면에 그리기
    window.document.getElementById("edit_title").value =
        diary_container.제목;
    window.document.getElementById("edit_content").value =
        diary_container.내용;
    window.document.getElementsByName("select_mood_button").forEach((element) => {
      if (element.value === diary_container.기분) element.checked = true;
    });

    // 5. 댓글을 화면에 표시
    if (diary_container.comments) {
      showComments(diary_container.comments);
    }

    // 6. 댓글 입력 버튼 비활성화
    document.getElementById("type_comment").disabled = true;
  };

  
  const JS_edit = () => {
    // 1. 주소에서 일기번호 가져오기
    const querystring = window.location.search;
    const number_container = new URLSearchParams(querystring);
    const diary_number = number_container.get("number");
  
    // 2. 스토리지에 저장된 일기목록 가져오기
    const storage_diary =
    window.localStorage.getItem("list_of_diary") ?? "[]";
    const diary_list = JSON.parse(storage_diary);
  
    // 3. 변경된 일기 새로운 통에 담기
    const modified_title_container =
      window.document.getElementById("edit_title").value;
    const modified_content_container =
      window.document.getElementById("edit_content").value;
    let modified_mood_container;
    window.document.getElementsByName("select_mood_button").forEach((element) => {
      if (element.checked) modified_mood_container = element.value;
    });
  
    diary_list[diary_number] = {
      제목: modified_title_container,
      내용: modified_content_container,
      기분: modified_mood_container,
      작성일: diary_list[diary_number].작성일,
      comments: diary_list[diary_number].comments || [] // 댓글 유지
    };
    window.localStorage.setItem("list_of_diary", JSON.stringify(diary_list));
  
    // 4. 상세페이지로 돌아가기
    location.replace(`./detail.html?number=${diary_number}`);
  };
  
  const JS_cancle = () => {
    // 1. 주소에서 일기번호 가져오기
    const querystring = window.location.search;
    const number_container = new URLSearchParams(querystring);
    const diary_number = number_container.get("number");
  
    // 2. 메인페이지로 돌아가기
    window.location.replace(`./detail.html?number=${diary_number}`);
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