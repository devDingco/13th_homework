
const getQueryParameter = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

//로컬 스토리지에서 특정 다이어리 항목을 불러와 렌더링하는 함수
const loadDiaryEntry = () => {
    const index = getQueryParameter('number');
    const jsondiary = localStorage.getItem("diarylist");
    const diarylist = JSON.parse(jsondiary) || [];

    if (index !== null && diarylist[index]) {
        const entry = diarylist[index];  

        document.getElementById('diary-title').textContent = entry.title;
        document.getElementById('diary-date').textContent = `${entry.date}q`;
        document.getElementById('diary-emotion').textContent = getEmotionText(entry.emotion);
        document.getElementById('diary-content').textContent = entry.content;
    } else {
        document.querySelector('.diary-detail').innerHTML = "<p>다이어리 항목을 찾을 수 없습니다.</p>";
    }
};

const getEmotionText = (emotion) => {
    switch (emotion) {
        case "happy":
            return "행복해요";
        case "sad":
            return "슬퍼요";
        case "surprise":
            return "놀랐어요";
        case "angry":
            return "화나요";
        case "etc":
            return "기타";
        default:
            return "";
    }
};


//----------------페이지별 보여지는 버튼설정(수정,저장)------------------
function initializePage() {
    const editButton = document.querySelector(".editbutton");
    
    const saveButton = document.querySelector(".savebutton");

    saveButton.style.display = "none";

    loadDiaryEntry();
}

// 수정 모드로 전환하는 함수
function toggleEditMode() {
    const titlecontainer = document.querySelector(".titlecontainer")
    const editmode = document.getElementById("editmode")
    const titleElement = document.getElementById("diary-title");
    const contentElement = document.getElementById("diary-content");
    const titleInput = document.getElementById("diary-title-input");
    const contentInput = document.getElementById("diary-content-input");
    const diaryemotion = document.getElementById("diary-emotion")
    const editButton = document.querySelector(".editbutton");
    const saveButton = document.querySelector(".savebutton");
    const diarydate = document.getElementById("diary-date");

    //현재 값을 입력 필드에 설정
    titleInput.value = titleElement.textContent;
    contentInput.value = contentElement.textContent;

    //수정모드일때 보여줄 요소
    editmode.style.display="block"
    titleElement.style.display = "none";
    contentElement.style.display = "none";
    titleInput.style.display = "block";
    contentInput.style.display = "block";
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    diaryemotion.style.display = "none"
    diarydate.style.display = "none"
    titlecontainer.style.border = "none"
}

//--------------수정된 내용들 로컬스토리지에 저장---------------
function saveChanges() {
    
    const titlecontainer = document.querySelector(".titlecontainer")
    const editmode = document.getElementById("editmode")
    const titleElement = document.getElementById("diary-title");
    const contentElement = document.getElementById("diary-content");
    const titleInput = document.getElementById("diary-title-input");
    const contentInput = document.getElementById("diary-content-input");
    const diaryemotion = document.getElementById("diary-emotion")
    const editButton = document.querySelector(".editbutton");
    const saveButton = document.querySelector(".savebutton");
    const diarydate = document.getElementById("diary-date");

    titleElement.textContent = titleInput.value;
    contentElement.textContent = contentInput.value;

    const index = getQueryParameter('number');
    const jsondiary = localStorage.getItem("diarylist");
    const diarylist = JSON.parse(jsondiary) || [];
    if (index !== null && index >= 0 && index < diarylist.length) {
        diarylist[index].title = titleInput.value;
        diarylist[index].content = contentInput.value;
        // 감정 저장
        const selectedEmotion = document.querySelector('input[name="emotion"]:checked');
        if (selectedEmotion) {
            diarylist[index].emotion = selectedEmotion.value;
            document.getElementById('diary-emotion').textContent = getEmotionText(diarylist[index].emotion);
        }
        
        localStorage.setItem("diarylist", JSON.stringify(diarylist));
    }

    //수정 후 보여줄 요소
    editmode.style.display="none"
    titleElement.style.display = "block";
    contentElement.style.display = "block";
    titleInput.style.display = "none";
    contentInput.style.display = "none";
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
    diaryemotion.style.display = "block";
    diarydate.style.display = "block";
    titlecontainer.style.borderBottom = "2px solid #000";
}

//페이지 로드 시 다이어리 항목을 불러옴
document.addEventListener("DOMContentLoaded", loadDiaryEntry);

