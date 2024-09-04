const getQueryParameter = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const getEmotionText = (emotion) => {
    switch (emotion) {
        case "happy": return "행복해요";
        case "sad": return "슬퍼요";
        case "surprise": return "놀랐어요";
        case "angry": return "화나요";
        case "etc": return "기타";
        default: return "";
    }
};
// 삭제 버튼 함수
const removeDiaryEntry = () => {
    const index = getQueryParameter('number');
    const jsonDiary = localStorage.getItem("diarylist");
    const diaryList = JSON.parse(jsonDiary) || [];
    if (index >= 0 && index < diaryList.length) {
        diaryList.splice(index, 1);
        localStorage.setItem("diarylist", JSON.stringify(diaryList));
    }
    location.href= '/homework/diary.html'

};

// 로컬 스토리지에서 다이어리 항목 불러옴
const loadDiaryEntry = () => {
    const index = getQueryParameter('number');
    const jsonDiary = localStorage.getItem("diarylist");
    const diaryList = JSON.parse(jsonDiary) || [];
    const icon = document.querySelector(".emotionIcon");

    if (index !== null && diaryList[index]) {
        const entry = diaryList[index];
        document.getElementById('diary-title').textContent = entry.title;
        document.getElementById('diary-date').textContent = `${entry.date} 작성`;
        document.getElementById('diary-emotion').textContent = getEmotionText(entry.emotion);
        document.getElementById('diary-content').textContent = entry.content;
        icon.innerHTML = `<img class="icon" src='./img/${entry.emotion}-small.png'/>`

   

        const emotionInputs = document.querySelectorAll('input[name="emotion"]');
        emotionInputs.forEach(input => {
            if (input.value === entry.emotion) {
                input.checked = true;
            }
        });
    } else {
        document.querySelector('.diary-detail').innerHTML = "<p>다이어리 항목을 찾을 수 없습니다.</p>";
    }
};

// 댓글 목록을 로드하고 렌더링하는 함수
const loadComments = () => {
    const index = getQueryParameter('number');
    const jsonDiary = localStorage.getItem("diarylist");
    const diaryList = JSON.parse(jsonDiary) || [];

    if (index !== null && diaryList[index] && Array.isArray(diaryList[index].retrospect)) {
        const commentList = diaryList[index].retrospect;

        const htmlCommentList = commentList.map((comment) => {
            return `
                <div class="commentContainer">
                    <div class="comment">${comment}</div>
                    <div class="comment_date">2024.09.24</div>
                </div>
            `;
        }).join('');

        const commentListContainer = document.getElementById("commentbox");
        commentListContainer.innerHTML = htmlCommentList;
    }
};

// 페이지를 초기화하고 다이어리 항목을 불러오는 함수
const initializePage = () => {
    document.querySelector(".editmode_button").style.display = "none";
    loadDiaryEntry();
    loadComments(); // 페이지 로드 시 댓글 로드
};

// 보기 모드와 수정 모드를 전환하는 함수
const toggleEditMode = () => {
    const elementsToToggle = [
        { element: document.getElementById("editmode"), display: "block" },
        { element: document.getElementById("diary-title"), display: "none" },
        { element: document.getElementById("diary-content"), display: "none" },
        { element: document.getElementById("diary-title-input"), display: "block" },
        { element: document.getElementById("diary-content-input"), display: "block" },
        { element: document.querySelector(".editbutton"), display: "none" },
        { element: document.querySelector(".savebutton"), display: "inline-block" },
        { element: document.querySelector(".cancelbutton"), display: "inline-block" },
        { element: document.getElementById("diary-emotion"), display: "none" },
        { element: document.getElementById("diary-date"), display: "none" },
        { element: document.querySelector(".editmode_button"), display: "block" },
    ];

    // 요소들의 display 스타일을 전환
    elementsToToggle.forEach(({ element, display }) => element.style.display = display);

    document.getElementById("diary-title-input").value = document.getElementById("diary-title").textContent;
    document.getElementById("diary-content-input").value = document.getElementById("diary-content").textContent;
    document.querySelector(".titlecontainer").style.border = "none";
};

// 변경 사항을 저장하고 로컬 스토리지를 업데이트
const saveChanges = () => {
    const titleInput = document.getElementById("diary-title-input");
    const contentInput = document.getElementById("diary-content-input");
    const titleElement = document.getElementById("diary-title");
    const contentElement = document.getElementById("diary-content");
    const selectedEmotion = document.querySelector('input[name="emotion"]:checked');
    const index = getQueryParameter('number');
    const jsonDiary = localStorage.getItem("diarylist");
    const diaryList = JSON.parse(jsonDiary) || [];

    titleElement.textContent = titleInput.value;
    contentElement.textContent = contentInput.value;

    // 로컬 스토리지를 업데이트
    if (index !== null && index >= 0 && index < diaryList.length) {
        diaryList[index].title = titleInput.value;
        diaryList[index].content = contentInput.value;
        if (selectedEmotion) {
            diaryList[index].emotion = selectedEmotion.value;
            document.getElementById('diary-emotion').textContent = getEmotionText(selectedEmotion.value);
        }
        localStorage.setItem("diarylist", JSON.stringify(diaryList));
    }

    //보기 모드로 전환
    cancelEditMode();

    //수정 후 테두리 복원
    document.querySelector(".titlecontainer").style.borderBottom = "2px solid #000";
};

// 수정 모드를 취소하고 원래 보기 모드로 돌아가는 함수
const cancelEditMode = () => {
    const elementsToToggle = [
        { element: document.getElementById("editmode"), display: "none" },
        { element: document.getElementById("content"), display: "block" },
        { element: document.getElementById("diary-content"), display: "block" },
        { element: document.getElementById("diary-title-input"), display: "none" },
        { element: document.getElementById("diary-content-input"), display: "none" },
        { element: document.querySelector(".editbutton"), display: "inline-block" },
        { element: document.querySelector(".savebutton"), display: "none" },
        { element: document.querySelector(".cancelbutton"), display: "none" },
        { element: document.getElementById("diary-emotion"), display: "block" },
        { element: document.getElementById("diary-date"), display: "block" },
    ];
    elementsToToggle.forEach(({ element, display }) => element.style.display = display);
    document.querySelector(".titlecontainer").style.borderBottom = "2px solid #000";
};


const retrospectButton = () => {
    const inputValue = document.querySelector(".retrospectInput").value;
    console.log(inputValue);
  
    const index = getQueryParameter('number');
    const jsonDiary = localStorage.getItem("diarylist");
    const diaryList = JSON.parse(jsonDiary) || [];
    if(diaryList[index]) {
        if(!Array.isArray(diaryList[index].retrospect)) {
            diaryList[index].retrospect = [];
        }
        diaryList[index].retrospect.push(inputValue) 
        localStorage.setItem("diarylist", JSON.stringify(diaryList));
        document.querySelector(".retrospectInput").value = "";

        const commentlist = diaryList[index].retrospect
        console.log(commentlist)
        const retrospectInput= document.getElementById(".retrospectInput")
        const htmlCommentList = commentlist.map((comment) => {
            return `
              <div class="commentContainer">
                <div class="comment">${comment}</div>
                <div class="comment_date">2024.09.24</div>
              </div>
            `
          }).join(''); // 배열을 문자열로 합칩니다.
      
          // 댓글을 렌더링할 요소를 선택합니다.
          const commentListContainer = document.getElementById("commentbox");
          commentListContainer.innerHTML = htmlCommentList;
    } else {
        
    }

  };
  
  

// 페이지 로드 시 다이어리 항목을 불러옴
document.addEventListener("DOMContentLoaded", initializePage);
