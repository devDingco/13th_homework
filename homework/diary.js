const getDiaryList = () => {
    const jsondiary = localStorage.getItem("diarylist");
    return JSON.parse(jsondiary) || [];
}

const removeDiaryEntry = (index) => {
    const diarylist = getDiaryList();

    if (index >= 0 && index < diarylist.length) {
        diarylist.splice(index, 1);
        localStorage.setItem("diarylist", JSON.stringify(diarylist));

        // 다이어리 항목 다시 렌더링
        renderDiaryEntries();
    }
};

const submit = () => {
    if (inputverify()) {
       
        const title = document.getElementById("titleInputModal").value;
        const content = document.getElementById("titleTextareaModal").value;

        //----------설명----------------
        //name으로 그룹화된 모든 라디오버튼 선택하는 것
        //checked된 라디오는 NodeList로 반환되는데 궁금하면 아래 주석처리된 콜솔로 찍어보면
        //배열처럼 저장되는 것을 알 수 있다
        //체크된 감정이 radioButons[0]에 저장이 되면 반환하고 아니면 null처리
        const radioButtons = document.querySelectorAll('input[name="emotion"]:checked')
        console.log(radioButtons)
        const chekcedRadio = radioButtons.length > 0 ? radioButtons[0].id : null;

        // 객체
        const diaryEntry = {
            title: title,
            content: content,
            emotion: chekcedRadio,
            date: new Date().toLocaleDateString(),
        };

        const diarylist = getDiaryList()
        // 배열에 객체 추가
        diarylist.push(diaryEntry)
        localStorage.setItem("diarylist", JSON.stringify(diarylist))
        console.log(diarylist)
        console.log(diaryEntry)


        openModal('completionModalContainer')
        renderDiaryEntries();

                    //초기화 함수
            document.getElementById("titleInputModal").value = "";
            document.getElementById("titleTextareaModal").value = "";
            document.getElementById("happy").checked = false;
            document.getElementById("sad").checked = false;
            document.getElementById("surprise").checked = false;
            document.getElementById("angry").checked = false;
            document.getElementById("etc").checked = false;


        } else {
            alert("내용을 전부 채워주세요.");
    }
};



// 인풋검증기능 함수
const inputverify = () => {

    const radioButtons = document.querySelectorAll('input[type="radio"]')
    let checkedEmotion = false

    radioButtons.forEach((radio) => {
        if(radio.checked) {
            checkedEmotion = true
        }
    }) 

    const title = document.getElementById("titleInputModal").value;
    const content = document.getElementById("titleTextareaModal").value;

 
    const writedtitle = title !== "";
    const wiredcontent = content !== "";

    return writedtitle && wiredcontent && checkedEmotion;
};

const handleSelectChange = () => {
    const selectBox = document.getElementById('selectbox');
    const selectedEmotion = selectBox.value;
    renderSelectBox(selectedEmotion); 
  };
  
  const renderSelectBox = (emt) => {
    const diarylistbox = document.querySelector(".diarylistbox");
    const jsondiary = localStorage.getItem("diarylist");
    const diarylist = JSON.parse(jsondiary) || [];
  
    // 셀렉트박스에서 전체가 선택되었을 때 모든 일기를 보여줌
    const filteredDiaryList = emt ==='all' ? diarylist : diarylist.filter(entry => entry.emotion === emt)
  
    // 필터링된 일기 데이터를 기반으로 HTML 생성
    const diaryHTML = filteredDiaryList.map((entry, index) => `
      <div class="diarybox">
        <div class="xbutton" onClick="removeDiaryEntry(${index})"></div>
        <a href="./diary-detail.html?number=${index}" style="text-decoration: none;">
          <div class="thumbnail_${entry.emotion}"></div>
          <div class="textbox">
            <div class="date_title_container">
              <div class="emotion_${entry.emotion}">${getEmotionText(entry.emotion)}</div>
              <div class="date">${entry.date}</div>
            </div>
            <div class="date_title_container">
              <div class="title">${entry.title}</div>
            </div>
          </div>
        </a>
      </div>
    `).join('');
  
    diarylistbox.innerHTML = diaryHTML;
  };
  
  


// 다이어리 항목 랜더링 함수
const renderDiaryEntries = () => {
    const diarylistbox = document.querySelector(".diarylistbox");
    const jsondiary = localStorage.getItem("diarylist");
    const diarylist = JSON.parse(jsondiary) || [];
    const diaryHTML = diarylist.map((entry,index) => `
        <div class="diarybox">
            <div class="xbutton" onClick="removeDiaryEntry(${index})"></div>
            <a href="./diary-detail.html?number=${index}" style="text-decoration: none;">
            <div class="thumbnail_${entry.emotion}"></div>
            <div class="textbox">
                <div class="date_title_container">
                    <div class="emotion_${entry.emotion}">${getEmotionText(entry.emotion)}</div>
                    <div class="date">${entry.date}</div>
                </div>
                <div class="date_title_container">
                    <div class="title">${entry.title}</div>
                </div>
            </div>
            </a>
        </div>
    `).join('');

    diarylistbox.innerHTML = diaryHTML;

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
window.addEventListener("scroll", () => {
    const scrollpoint = window.scrollY;
    if(scrollpoint > 0) {
        document.getElementById("selectbox").style= "background-color: #000; color: #fff"
    } else {
        document.getElementById("selectbox").style= "background-color: none; color: none"
    };
});

const floating = () => {
    window.scrollTo({top:0, behavior:"smooth"});
};

window.addEventListener('scroll', () => {
    const toptofooter = document.getElementById('footer').getBoundingClientRect().top;
    const browserlength = window.innerHeight;
    console.log(toptofooter);

    if(browserlength >= toptofooter){
        document.getElementById("floating").style = `
            position: fixed;
            bottom: 170px;
            left: 78%;
        `
    }else{
        document.getElementById("floating").style = `
            position: fixed;
            bottom: 10px;
            left: 78%;

                `
    };
    
})

//------------------------모달 관련 스크립트-------------------------
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalIds) {
    // 여러 ID를 콤마로 분리
    const idsArray = modalIds.split(',');

    idsArray.forEach(modalId => {
        const modal = document.getElementById(modalId.trim());
        if (modal) {
            modal.style.display = 'none';
        }
    });
}


// 페이지 로드 시 다이어리 항목 렌더링
document.addEventListener("DOMContentLoaded", renderDiaryEntries);