const 일기목록 = [] // 일기항목 저장할 배열
const 감정목록 = ["행복해요", "슬퍼요", "놀랐어요", "화나요", "기타"]
const 감정사진 = ["./images/행복해요.png", "./images/슬퍼요.png", "./images/놀랐어요.png", "./images/화나요.png", "./images/기타.png"]
const 감정색깔 = ["color: #EA5757", "color: #28B4E1", "color: #D59029", "color:#777777", "color:#A229ED"]


const 일기등록기능 = () => {
    const 오늘날짜 = new Date();
    const 작성날짜 = `${오늘날짜.getFullYear()}-${오늘날짜.getMonth() + 1}-${오늘날짜.getDate()}`;

    const 감정 = document.querySelector('input[name="기분"]:checked').value

    const 제목 = document.getElementById("제목인풋").value
    const 내용 = document.getElementById("내용인풋").value
    
    let 감정사진선택 = 감정사진[4] // 감정사진 초기
    let 감정색깔선택 = 감정색깔[4]

    for(let 반복 = 0 ; 반복 < 감정목록.length ; 반복 = 반복 + 1){
        // background: url(${감정사진[반복]}) lightgray 50% / cover no-repeat;
        if(감정 === 감정목록[반복]) {
            감정사진선택 = 감정사진[반복]
            감정색깔선택 = 감정색깔[반복]
        
        }
    }

    console.log(감정사진선택, 감정색깔선택)
    
    // 일기항목 객체를 생성
    const 일기항목 = {
        감정: 감정,
        제목: 제목,
        내용: 내용,
        날짜: 작성날짜,
        감정사진: 감정사진선택,
        감정색깔: 감정색깔선택
    }

    일기목록.push(일기항목)
    if ((일기목록.length % 2) !== 0) {
        document.getElementById("일기추가할공간").style = "justify-content: left"
    }else {
        document.getElementById("일기추가할공간").style = "justify-content: center"
    }
    일기DOM만들기()
}

const 일기클릭기능 = (index) => {
    const 일기정보 = 일기목록[index]
    alert(`제목: ${일기정보.제목}
내용: ${일기정보.내용}
감정: ${일기정보.감정}
`)

}

const 일기DOM만들기 = () => {
    const 일기목록만들기 =  일기목록.map(
        (일기, index) => 
            `<div class="일기_항목" onclick="일기클릭기능(${index})">
                    <div class="감정_사진" style="background: url(${일기.감정사진}) lightgray 50% / cover no-repeat"></div>
                    <div class="일기_감정_제목보기">
                        <div class="일기_감정_날짜">
                            <div class="일기_항목_감정">${일기.감정}</div>
                            <div class="일기_항목_날짜">${일기.날짜}</div>
                        </div>
                        <div class="일기_항목_제목_공간">
                            <div class="일기_항목_제목">${일기.제목}</div>
                        </div>
                    </div>
                </div>
    `
    ).join("")

    document.getElementById("일기추가할공간").innerHTML = 일기목록만들기

}


