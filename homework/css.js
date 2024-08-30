const diarylist = [];


const submit = () => {
    if (inputverify()) {
       
        const happychecked = document.getElementById("happy").checked;
        const sadchecked = document.getElementById("sad").checked;
        const surprisechecked = document.getElementById("surprise").checked;
        const angrychecked = document.getElementById("angry").checked;
        const etcchecked = document.getElementById("etc").checked;

        const title = document.getElementById("writingtitle").value;
        const content = document.getElementById("writingcontent").value;

       
        let emotion;
        if (happychecked) emotion = "happy";
        if (sadchecked) emotion = "sad";
        if (surprisechecked) emotion = "surprise";
        if (angrychecked) emotion = "angry";
        if (etcchecked) emotion = "etc";

        // 객체
        const diaryEntry = {
            title: title,
            content: content,
            emotion: emotion,
            date: new Date().toLocaleDateString()
        };

        // 배열에 객체 추가
        diarylist.push(diaryEntry);

       
        renderDiaryEntries();

        
        document.getElementById("writingtitle").value = "";
        document.getElementById("writingcontent").value = "";
        document.getElementById("happy").checked = false;
        document.getElementById("sad").checked = false;
        document.getElementById("surprise").checked = false;
        document.getElementById("angry").checked = false;
        document.getElementById("etc").checked = false;
    } else {
        alert("내용을 전부 채워주세요.");
    }
};

//------------------인풋검증기능----------------------
const inputverify = () => {
    const happychecked = document.getElementById("happy").checked;
    const sadchecked = document.getElementById("sad").checked;
    const surprisechecked = document.getElementById("surprise").checked;
    const angrychecked = document.getElementById("angry").checked;
    const etcchecked = document.getElementById("etc").checked;

    const title = document.getElementById("writingtitle").value;
    const content = document.getElementById("writingcontent").value;

 
    const writedtitle = title !== "";
    const wiredcontent = content !== "";
   
    const checkedemotion = happychecked || sadchecked || surprisechecked || angrychecked || etcchecked;

    return writedtitle && wiredcontent && checkedemotion;
};

//------------------다이어리 항목 렌더링----------------------
const renderDiaryEntries = () => {
    const diarylistbox = document.querySelector(".diarylistbox");
    diarylistbox.innerHTML = ""; 

    diarylist.forEach((entry) => {
        const diarybox = document.createElement("div");
        diarybox.className = "diarybox";
        

        const thumbnail = document.createElement("div");
        thumbnail.className = `thumbnail_${entry.emotion}`;
        diarybox.appendChild(thumbnail);

        const textbox = document.createElement("div");
        textbox.className = "textbox";
        diarybox.appendChild(textbox);

        const dateTitleContainer1 = document.createElement("div");
        dateTitleContainer1.className = "date_title_container";
        textbox.appendChild(dateTitleContainer1);

        const emotionDiv = document.createElement("div");
        emotionDiv.className = `emotion_${entry.emotion}`;
        emotionDiv.textContent = getEmotionText(entry.emotion);
        dateTitleContainer1.appendChild(emotionDiv);

        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.textContent = entry.date;
        dateTitleContainer1.appendChild(dateDiv);

        const dateTitleContainer2 = document.createElement("div");
        dateTitleContainer2.className = "date_title_container";
        textbox.appendChild(dateTitleContainer2);

        const titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = entry.title;
        dateTitleContainer2.appendChild(titleDiv);

        diarylistbox.appendChild(diarybox);

        
        diarybox.addEventListener("click", () => {
            alert(
`제목: ${entry.title}
내용: ${entry.content}
감정: ${getEmotionText(entry.emotion)}
날짜: ${entry.date}`
            );
        });
    });
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
