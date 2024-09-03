

window.onload = () => {
    const detailList01 = localStorage.getItem("detailList")
    const detailList02 = JSON.parse(detailList01)

    let 기분이미지 = "";
    // 상세페이지 작은감정이미지 맞게 뿌리기
    switch(detailList02.기분){
        case "행복해요": {
            기분이미지 = `<img src="./CSS&JS 마스터/행복해요 (s).png" width="32px">`
            break;
        }
        case "슬퍼요": {
            기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
            break;
        }
        case "놀랐어요": {
            기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
            break;
        }
        case "화나요": {
            기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
            break;
        }
        case "기타": {
            기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (s).png" width="32px">`
            break;
        }
    }

    document.getElementById("localPintBox").innerHTML = 
    `
            <section class="titleBox">
                <div class="titlePrint">${detailList02.제목}</div>
                <div class="myEmotion">
                    <div class="myEmotionPrint">
                        ${기분이미지}
                        <span>${detailList02.기분}</span>
                    </div>
                    <div class="writeDayPrint">${detailList02.작성날짜} 작성</div>
                </div>
            </section>
            <section class="detailBox">
                <div>내용</div>
                <div class="wirtePrint">${detailList02.내용}</div>
            </section>
            <section class="detailBoxBtn">
                <a>
                    <button onclick="changeDiaryBox()">수정</button>
                </a>
            </section>
    `
}

// 수정버튼 눌러서 일기상세_수정
const changeDiaryBox = () => {

}
