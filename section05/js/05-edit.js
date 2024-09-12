const getFromLocalstorage = (storageKey) => {
    try {
       
        const data = window.localStorage.getItem(storageKey) ?? "[]";
        return JSON.parse(data);
    } catch (error) {
        console.error("데이터를 로컬에서 가져오는데 실패했습니다", error);
        return [];
    }
  };
   
   //로컬로 데이터를 저장하기
  const saveToLocalstorage = (storageKey,data) => {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
        console.error("데이터를 로컬저장하는데 실패했습니다", error);
    }
  };
  
  // "URL에서 원하는 'number' 가져오기"
  const getDiaryNumber = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return parseInt(urlParams.get("number"),10) ;
        
  };
  
  // 일기데이터를 로컬에서 가져오기
  const getDiaryList = (storageKey) => {
    const diaryNumber = getDiaryNumber();
    const diaryList = getFromLocalstorage(storageKey);
  
    return { diaryList, diaryNumber };
  };
  
  // 일기데이터를 로컬에 저장하기
  const saveDiaryList = (storageKey,diaryList) => {
    saveToLocalstorage(storageKey, diaryList);
  }
  
const loadDiaryEdit = () => {
    const { diaryList, diaryNumber } = getDiaryList("민지의일기목록");

    if (!diaryList[diaryNumber]) {
        alert("해당일기를 찾을수가 없습니다")
        window.location.replace("/homework/section05/05-index.html");
        return;
    }
    
    const diaryContain = diaryList[diaryNumber];

    window.document.querySelector("#edit_diaryTitle").value = diaryContain.title;
    window.document.querySelector("#edit_diaryText").value = diaryContain.content;
    window.document.getElementsByName("moodChoiceBtn").forEach((el) => {
        if (el.value === diaryContain.mood) el.checked = true;
    });

    const commentList = diaryContain.commentList ?? [];

    let newCommentList = "";
    commentList.forEach((comment, index) => {
        const isLast = index = commentList.length - 1;
        
        newCommentList += `
        <div class="commentList ${!isLast ? "" : "마지막"}">
        <div class="commentListContent ${comment.content}"></div>
        <div class="commentListDate ${comment.date}"></div>
        </div>
        `
    });
    document.getElementById("commentList").innerText = newCommentList;
};

const editComplte = () => {
    const { diaryList, diaryNumber } = getDiaryList("민지의일기목록");

    const editTile = window.document.querySelector("#edit_diaryTitle").value.trim();
    const editContent = window.document.querySelector("#edit_diaryText").value.trim();

    if (!editTile || !editContent) {
        alert("제목과 내용을 모두 입력해주세요");
        return;
    }

    let editMood;
    const checkedElement = Array.from(document.getElementsByName("moodChoiceBtn")).find(el => el.checked);
    if (checkedElement) {
        editMood = checkedElement.value;
    } else {
        alert("기분을 선택해주세요");
        return;
    }
     
    diaryList[diaryNumber] = {
        title: editTile,
        content: editContent,
        mood: editMood,
        writing: diaryList[diaryNumber].writing,
    };

    saveDiaryList("민지의일기목록", diaryList);
    window.location.replace(`/homework/section05/05-detail.html?number=${diaryNumber}`);
};

const editCancel = () => {
    const { diaryNumber } = getDiaryList("민지의일기목록");

    window.location.replace(`/homework/section05/05-detail.html?number=${diaryNumber}`);
};

const backToThe = () => {
    window.history.back();
}