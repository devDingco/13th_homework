const getFromLocalstorage = (storageKey) => {
    try {
       
        const data = window.localStorage.getItem(storageKey) ?? "[]";
        return JSON.parse(data);
    } catch (error) {
        console.error("데이터를 로컬에서 가져오는데 실패했습니다", error);
        return [];
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
const saveDiaryList = (storageKey, diaryList) => {
    saveToLocalstorage(storageKey, diaryList);
  };
  
window.loadDiaryDetail = () => {
    const { diaryNumber, diaryList } = getDiaryList("민지의일기목록");

    if (!diaryList || !diaryNumber < 0 || diaryNumber >= diaryList.length) {
        alert("일기를 찾을수가 없습니다");
        return;
    }

    const diaryContain = diaryList[diaryNumber]

    const mood = diaryContain.mood;
    let moodMessage;
    let img;
    let color;

    switch (mood) {
        case "행복":
            moodMessage = "행복해요";
            img = "/homework/assets/images/happiness-imoji.png";
            color = "#EA5757";
            break;
        case "화남":
            moodMessage = "화나요";
            img = "/homework/assets/images/angry-imoji.png";
            color = "#777";
            break;
        case "슬픔":
            moodMessage = "슬퍼요";
            img = "/homework/assets/images/sadness-imoji.png";
            color = "#28B4E1";
            break;
        case "놀람":
            moodMessage = "놀랐어요";
            img = "/homework/assets/images/surprise-imoji.png";
            color = "#D59029";
            break;
        default:
            moodMessage = "기타";
            img = "/homework/assets/images/um-imoji.png"
            color = "#A229ED";
            break;
    }

   
        window.document.querySelector("#diaryTitle").innerHTML = diaryContain.title;
        window.document.querySelector("#moodShowing").innerHTML = moodMessage;
        window.document.querySelector("#moodShowing").style.color = color;
        window.document.querySelector("#diaryContent_detail").innerHTML = diaryContain.content;
        window.document.querySelector("#moodImg").src = img;
    window.document.querySelector("#dateList").innerHTML = diaryContain.date;
    
    createComment();

    const commentList = document.querySelector("#commentList");
    if (commentList) {
        commentList.scrollIntoView({ behavior: "smooth" });
    }

};

window.onload = loadDiaryDetail;

const editMove = () => {
    const { diaryNumber } = getDiaryList("민지의일기목록");
    window.location.href = `/homework/section05/05-edit.html?number=${diaryNumber}`;
};

let nowDeleteDiaryNumer = null;

const diaryDelete = () => {
    openModal('diaryDeleteModalGroup');
}

const diaryDeleteConfirm = () => {
    const { diaryNumber, diaryList } = getDiaryList("민지의일기목록");
    nowDeleteDiaryNumer = diaryNumber;

    if (nowDeleteDiaryNumer !== null) {
        const afterDeleteList = diaryList.filter((_, index) => {
            index !== parseInt(diaryNumber, 10)
        });
        window.localStorage.setItem("민지의일기목록", JSON.stringify(afterDeleteList));

        window.location.replace("/homework/section05/05-index.html")
    };
};

const addComment = () => {
    const { diaryNumber, diaryList } = getDiaryList("민지의일기목록");

    const commentBox = window.document.querySelector("#commentInput").value;

    const currentCommentList = diaryList[diaryNumber].commentList;

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(now).replace(/\./g, "").replace(/\s/g, "-");
    
    if (currentCommentList === undefined) {
        diaryList[diaryNumber].commentList = [
            {
                commentContent: commentBox,
                date: formattedDate,
            },
        ];
    } else {
        diaryList[diaryNumber].commentList.push(
            {
                commentContent: commentBox,
                date: formattedDate,
            },
        );
    }
    saveDiaryList("민지의일기목록", diaryList);

    createComment();

};

const createComment = () => {
    const { diaryNumber, diaryList } = getDiaryList("민지의일기목록");

    const diaryContain = diaryList[diaryNumber];

    const commentList = diaryContain.commentList ?? [];

    let newCommentList = "";
    commentList.forEach((comment, index) => {
        const isLast = index = commentList.length - 1;
        
        newCommentList += `
        <div class="commentList ${!isLast ? "" : "마지막"}">
        <div class="commentList ${comment.content}"></div>
        <div class="commentList ${comment.title}"></div>
        </div>
        `
    });
    document.getElementById("commentList").innerText = newCommentList;
};

const backToThe = () => {
    window.history.back();
};

const copyEnter = () => {
    const { diaryNumber, diaryList } = getDiaryList("민지의일기목록");

    const diaryContain = diaryList[diaryNumber];

    navigator.clipboard.writeText(diaryContain.content);

    copyToastBox();

};
