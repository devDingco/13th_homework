// 가상 데이터 생성 및 로컬스토리지에 저장
const localStorageputdata = () => {
    const diarylist = [];
    for (let i = 1; i <= 400; i++) {
        let data = {
            title: `Title ${i}`,
            content: `Content for entry ${i}`,
            emotion: 'surprise',
            date: `2024. 9. 20`
        };
        diarylist.push(data); // 배열에 추가
    }
    localStorage.setItem('diarylist', JSON.stringify(diarylist)); // 'diarylist'라는 키로 배열을 저장
    console.log('100개의 가상 데이터가 로컬스토리지에 저장되었습니다.');
};

// 가상 데이터 저장 호출
localStorageputdata();


const getDiaryList = () => {
    const jsondiary = localStorage.getItem("diarylist");
    return JSON.parse(jsondiary) || [];
}

const removeDiaryEntry = (index) => {
    const diarylist = getDiaryList();

    if (index >= 0 && index < diarylist.length) {
        diarylist.splice(index, 1);
        localStorage.setItem("diarylist", JSON.stringify(diarylist));
        closeModal('deleteModalContainer')
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

const dropdownselected = (event) => {
    document.querySelector('.customDropdown').style.cssText = `
        --text: "${event.target.value}"
    `
    document.querySelector('.customDropdown').click() //한번더 드롭다운제목 부분이 클릭되면서 닫히게끔 구현
    const selectedEmotion = event.target.id
    // renderSelectBox(selectedEmotion); 
};
  
// const renderSelectBox = (emt) => {
//     const diarylistbox = document.querySelector(".diarylistbox");
//     const jsondiary = localStorage.getItem("diarylist");
//     const diarylist = JSON.parse(jsondiary) || [];

//     // 셀렉트박스에서 전체가 선택되었을 때 모든 일기를 보여줌
//     const filteredDiaryList = emt ==='all' ? diarylist : diarylist.filter(entry => entry.emotion === emt)

//     // 필터링된 일기 데이터를 기반으로 HTML 생성
//     const diaryHTML = filteredDiaryList.map((entry, index) => `
//         <div class="diarybox">
//         <div class="xbutton" onClick="openModal('deleteModalContainer')"></div>
//         <a href="./diary-detail.html?number=${index}" style="text-decoration: none;">
//             <div class="thumbnail_${entry.emotion}"></div>
//             <div class="textbox">
//             <div class="date_title_container">
//                 <div class="emotion_${entry.emotion}">${getEmotionText(entry.emotion)}</div>
//                 <div class="date">${entry.date}</div>
//             </div>
//             <div class="date_title_container">
//                 <div class="title">${entry.title}</div>
//             </div>
//             </div>
//         </a>
//         </div>
//     `).join('');

//     diarylistbox.innerHTML = diaryHTML;
// };
  
  


// 다이어리 항목 랜더링 함수 
const renderDiaryEntries = () => {
    const diarylistbox = document.querySelector(".diarylistbox");
    const jsondiary = localStorage.getItem("diarylist");
    const diarylist = JSON.parse(jsondiary) || [];
    const diaryHTML = diarylist.map((entry,index) => `
        <div class="diarybox">
            <div class="xbutton" onClick="deleteButton(${index})"></div>
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

const deleteButton = (index) => {
    openModal('deleteModalContainer')
    document.getElementById('deleteModalContainer').innerHTML = `
        <div class="deleteModalbackground" onclick="closeModal('deleteModalContainer')">
            <div class="deleteModal" onclick="event.stopPropagation()">
                <div class="text3">일기 삭제</div>
                <div class="text4">일기를 삭제 하시겠어요?</div>
                <div class="modalButtonContainer">
                    <button class="closeButton" type="button" onclick="closeModal('deleteModalContainer')"><div class="closeButtonText">취소</div></button>
                    <button class="confirmButton" type="button"  onclick="removeDiaryEntry(${index})"><div class="confirmButtonText">삭제</div></button>
                </div>
            </div> 
        </div>
    `
}





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
// window.addEventListener("scroll", () => {
//     const scrollpoint = window.scrollY;
//     if(scrollpoint > 0) {
//         document.getElementById("selectbox").style= "background-color: #000; color: #fff"
//     } else {
//         document.getElementById("selectbox").style= "background-color: none; color: none"
//     };
// });

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
    document.body.style.overflow = 'hidden'

}

function closeModal(modalIds) {
    const idsArray = modalIds.split(',');

    idsArray.forEach(modalId => {
        const modal = document.getElementById(modalId.trim());
        if (modal) {
            modal.style.display = 'none';
        }
    });
    document.body.style.overflow = 'auto';
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal('modalcontainer,closeModalContainer'); 
    }
});


// 페이지 로드 시 다이어리 항목 렌더링
document.addEventListener("DOMContentLoaded", renderDiaryEntries);




//------------------강아지 사진 페이지 관련 스크립트-----------------------------

const changePage = (click) => {
    switch(click) {
        case "일기보관함": {
            document.getElementById('photoStorage').className = "menu_inactive";
            document.getElementById('diaryStorage').className = "menu_active";
            document.getElementById('content').style.display = "block";
            document.getElementById('photoStorageContent').style.display = 'none'
            break;
        }
        case "사진보관함": {
            document.getElementById('photoStorage').className = "menu_active";
            document.getElementById('diaryStorage').className = "menu_inactive";
            document.getElementById('content').style.display = "none"; 
            document.getElementById('photoStorageContent').style.display = 'block' 
            break;

        }
    }
}


// API에서 이미지를 불러옴
const loadImages = (size) => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json())
        .then((result) => {
            const photoContainer = document.getElementById('photoContainer');
            const imageUrl = result.message;
            let aspectRatio;
            switch (size) {
                case "horizontal":
                    aspectRatio = "4 / 3"; 
                    break;
                case "vertical":
                    aspectRatio = "3 / 4";
                    break;
                case "basic":
                default:
                    aspectRatio = "1 / 1";
                    break;
            }

            const imageBox = document.createElement('div');
            imageBox.className = 'imageBox';
            imageBox.style.aspectRatio = aspectRatio;
            imageBox.innerHTML = `
                <div class="skeleton">
                    <div class="skeleton-animation"></div>
                </div>
                <img src="${imageUrl}" onload="hideSkeleton(this)" />
            `;
            photoContainer.appendChild(imageBox);
        })
        .catch((error) => {
            console.error("API 호출 오류:", error);
        });
};

// 스켈레톤을 숨기는 함수
const hideSkeleton = (imageElement) => {
    const imageBox = imageElement.closest('.imageBox');
    const skeleton = imageBox.querySelector('.skeleton');
    if (skeleton) {
        skeleton.style.display = 'none';
    }
};

// 무한 스크롤
let timer = null;
const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);

    if (scrollPercent > 0.7 && timer === null) {
        const selectBox2 = document.getElementById('selectbox2');
        const selectedPhotoSize = selectBox2.value;
        loadImages(selectedPhotoSize);

        timer = setTimeout(() => {
            timer = null;
        }, 10);
    }
};

// 셀렉트 박스 변경 시
const handleSelectChange = () => {
    const selectBox2 = document.getElementById('selectbox2');
    const selectedPhotoSize = selectBox2.value;
    document.getElementById('photoContainer').innerHTML = '';
    loadImages(selectedPhotoSize);
};

window.onload = () => {
    loadImages('basic')
    window.addEventListener('scroll', handleScroll);
    const selectBox2 = document.getElementById('selectbox2');
    selectBox2.addEventListener('change', handleSelectChange);

    pagination();
    pageRender(startPageNumber)
};




const searchDiaryEntries = () => {
    const searchInput = document.getElementById("searchInput").value
    const diarylist = getDiaryList();
    const filteredDiaryList = diarylist.filter(entry => 
        entry.title.includes(searchInput)
    );

    const diarylistbox = document.querySelector(".diarylistbox")
    diarylistbox.innerHTML = ''; 

    setTimeout(() => {
        const diaryHTML = filteredDiaryList.map((entry, index) => `
            <div class="diarybox">
                <div class="xbutton" onClick="deleteButton(${index})"></div>
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
    }, 1000); 
};

function togglehandler(event) {
    const isChecked = event.target.checked;
    const modal = document.querySelector('.modal');
    const text1 = document.querySelector('.text1');
    const text2 = document.querySelector('.text2');
    const titleInModal = document.querySelectorAll('.titleInModal')
    const inputContainers = document.querySelectorAll('.inputcontainer');
    const titleInputModal = document.querySelector('.titleInputModal');
    const closeButton = document.querySelector('.closeButton');
    const closeButtonText = document.querySelector('.closeButtonText');
    const confirmButton = document.querySelector('.confirmButton');
    const confirmButtonText = document.querySelector('.confirmButtonText');


    if (isChecked) {
        modal.classList.add('dark-mode');
        text1.classList.add('dark-mode');
        text2.classList.add('dark-mode');
        titleInModal.forEach(element => element.classList.add('dark-mode'));
        inputContainers.forEach(container => container.classList.add('dark-mode'));
        titleInputModal.classList.add('dark-mode');
        titleTextareaModal.classList.add('dark-mode');
        closeButton.classList.add('dark-mode');
        closeButtonText.classList.add('dark-mode');
        confirmButton.classList.add('dark-mode');
        confirmButtonText.classList.add('dark-mode');
    } else {
        modal.classList.remove('dark-mode');
        text1.classList.remove('dark-mode');
        text2.classList.remove('dark-mode');
        titleInModal.forEach(element => element.classList.remove('dark-mode'));
        inputContainers.forEach(container => container.classList.remove('dark-mode'));
        titleInputModal.classList.remove('dark-mode');
        titleTextareaModal.classList.remove('dark-mode');
        closeButton.classList.remove('dark-mode');
        closeButtonText.classList.remove('dark-mode');
        confirmButton.classList.remove('dark-mode');
        confirmButtonText.classList.remove('dark-mode');
        
    }
}


//----------------페이지네이션 관련 스크립트--------------------------
const data = getDiaryList();
let clickPage = 1;
let startPageNumber = 1;
const lastPageNumber = Math.ceil(data.length / 12);

const prevPageHandler = () => {
    if (startPageNumber === 1) {
        alert('첫 페이지입니다.');
    } else {
        startPageNumber = startPageNumber - 10;
        clickPage = startPageNumber;
        pagination();
        pageRender(clickPage);
    }
}

const nextPageHandler = () => {
    if (startPageNumber + 10 <= lastPageNumber) {
        startPageNumber = startPageNumber + 10;
        clickPage = startPageNumber;
        pagination();
        pageRender(clickPage);
    } else {
        alert("마지막 페이지입니다.");
    }
}

const pagination = () => {
    const count = new Array(10).fill('n');

    const pageNumberRender = count.map((el, index) => {
        const pageNumber = index + startPageNumber;

        return pageNumber <= lastPageNumber 
            ? `<div 
                class="${clickPage === pageNumber ? 'numberButton_active' : 'numberButton'}"
                onclick="pageRender(${pageNumber}); setClickPage(${pageNumber})"
                >
                ${pageNumber}
            </div>` 
            : "";
    }).join('');
    
    document.getElementById('pagination_show').innerHTML = pageNumberRender;
}

const setClickPage = (page) => {
    clickPage = page;
    pagination(); // Re-render to update the active button
}

const pageRender = (pageContainer) => {
    const diaryRender = data.filter((el, index) => {
        const page_show = 12;
        const content_show = (pageContainer - 1) * page_show;

        return index >= content_show && index < content_show + page_show;
    });

    document.querySelector('.diarylistbox').innerHTML = diaryRender.map((el, index) => `
        <div class="diarybox">
            <div class="xbutton" onClick="deleteButton(${index})"></div>
            <a href="./diary-detail.html?number=${index}" style="text-decoration: none;">
                <div class="thumbnail_${el.emotion}"></div>
                <div class="textbox">
                    <div class="date_title_container">
                        <div class="emotion_${el.emotion}">${getEmotionText(el.emotion)}</div>
                        <div class="date">${el.date}</div>
                    </div>
                    <div class="date_title_container">
                        <div class="title">${el.title}</div>
                    </div>
                </div>
            </a>
        </div>
    `).join("");
}



