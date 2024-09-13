// 스크롤 top
const top_scroll = () => {
    window.scrollTo( {top:0, behavior:"smooth" })
}

// window.onload = () => {
//     register();
// }

// 일기등록
// 배열
const diaryList = [];
const register = () => {

    // 등록확인모달
    document.getElementById("regi_modal_group").style="display:block;"    
    // 날짜
    const date = new Date();

    // localStorage 
    const diary_storage = window.localStorage.getItem("my_diary") ?? "[]";
    const diaryList = JSON.parse(diary_storage);

    const ymd = {
        year:date.getFullYear(),
        month:(date.getMonth()+1).toString().padStart(2, "0"),
        date:date.getDate()
    };

    // 일기불러오기
    const diaryDate = ymd.year+"."+ymd.month+"."+ymd.date;
    const diaryTitle = window.document.getElementById("title_rg").value;
    const diaryMemo = window.document.getElementById("memo_rg").value;

    // 기분불러오기
    let happy = window.document.getElementsByName("emotion")[0].checked === true;
    let sad = window.document.getElementsByName("emotion")[1].checked === true;
    let surprise = window.document.getElementsByName("emotion")[2].checked === true;
    let angry = window.document.getElementsByName("emotion")[3].checked === true;
    let etc = window.document.getElementsByName("emotion")[4].checked === true;

    // 일기 객체
    const diaryArray = {
        제목: diaryTitle,
        내용: diaryMemo,
        작성일: diaryDate
    };
    diaryList.push(diaryArray);
    // 일기 로컬스토리지에 저장
    window.localStorage.setItem("my_diary", JSON.stringify(diaryList));

    // 마지막 순서로 추가
    const diaryNumber = diaryList.length-1;

    // 일기 가져오기
    const diaryBr = window.document.getElementById("diary_box").innerHTML;

    // 일기 만들기
    const newDiary = `
        <div class="content_bg" onclick="diary_detail_info(${diaryNumber})">
            <img class="diary_close" src="./img/close icon.png" alt="">
            <div class="diary_content">
                ${happy === true ? '<img class="emotion_img" src="./img/happy.png" alt="행복">':""}
                ${sad === true ? '<img class="emotion_img" src="./img/sad.png" alt="슬픔">':""}
                ${surprise === true ? '<img class="emotion_img" src="./img/surprise.png" alt="놀람">':""}
                ${angry === true ? '<img class="emotion_img" src="./img/angry.png" alt="화남">':""}
                ${etc === true ? '<img class="emotion_img" src="./img/etc.png" alt="기타">':""}
            </div>
            <div class="content_title">
                ${happy === true ? `<div class="happy">행복해요</div>`:""}
                ${sad === true ? `<div class="sad">슬퍼요</div>`:""}
                ${surprise === true ? `<div class="surp">놀랐어요</div>`:""}
                ${angry === true ? `<div class="angry">화나요</div>`:""}
                ${etc === true ? `<div class="etc">기타</div>`:""}
                <div class="diary_date">${diaryArray.작성일}</div>
                </div>
            <div class="diary_title">${diaryArray.제목}</div>
        </div>
        `;

        // 일기 보여주기
        window.document.getElementById("diary_box").innerHTML = diaryBr + newDiary;
    }

    const diary_detail_info = (diaryNumberBox) => {
        const diaryArray = diaryList[diaryNumberBox];
        const diaryTitle = diaryArray.제목;
        const diaryMemo = diaryArray.내용;
        // const diaryNumber = diaryArray.번호;
        console.log("111")

        alert(
            `
            제목:${diaryTitle}
            내용:${diaryMemo}
            `
        );

        // location.href =`./detail.html?diaryNumber=${diaryNumberBox}`;
    };


// 모달
const modal_btn = () => {
    document.getElementById("modal").style="display:block;"
    document.getElementById("regi_cancel_group").style="display:none;"
    document.getElementById("regi_modal_group").style="display:none;"
}
const modal_close = () => {
    document.getElementById("modal").style="display:none;"
}

// 일기등록취소모달
const regi_cancel = () => {
    document.getElementById("regi_cancel_group").style="display:block;"
}
const cancel_close = () => {
    document.getElementById("regi_cancel_group").style="display:none;"
}

const check_close = () => {
    document.getElementById("regi_modal_group").style="display:none;"
}


// 스크롤 내리면 필터 색 변경
window.onscroll = () => {
    const selectElemnet = document.querySelector(".diary_select>select");

    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        selectElemnet.classList.add("d_change_color");
    }
    else{
        selectElemnet.classList.remove("d_change_color");
    }
}

const JS_scroll = () => {
    const scroll_down = document.getElementsByClassName("diary_select").scrollTop;

    if(scroll_down){
        document.getElementsByClassName("diary_select").style="background-color:gray;";
    }
    else{
        document.getElementsByClassName("diary_select").style="background-color:red;";
    }
}
// getElementById("") ?