const getDiary = JSON.parse(localStorage.getItem("diaryData"))
const indexNum = window.location.search.substring(6)

const diaryMood = getDiary[indexNum].mood
const diaryDate = getDiary[indexNum].date
const diaryTitle = getDiary[indexNum].title
const diaryContent = getDiary[indexNum].content

const moodIndex = {
    happy: "행복해요",
    sad: "슬퍼요",
    surprise: "놀랐어요",
    angry: "화나요",
    etc: "기타"
};

function makeDiaryDetail() {
    if ( getDiary !== null ) {
        const diaryDetail = document.querySelector(".container__body")
        diaryDetail.innerHTML =
`
<div class="container__content">
            <div class="body__title">${diaryTitle}</div>
            <div class="body__status">
                <div class="status__mood">
                    <div class="mood__img">
                        <img src="../asset/icon__${diaryMood}.png" />
                    </div>
                    <div class="mood__text">${moodIndex[diaryMood]}</div>
                </div>
                <div class="status__post">
                    <div class="post__date">${diaryDate}</div>
                    <div class="post__text">작성</div>
                </div>
            </div>
            <div class="body__content">
                <div class="content__title">
                    <div class="title__text">내용</div>
                    <div class="title__btn">
                        <div class="btn__edit">수정</div>
                        <div class="btn__delete">삭제</div>
                    </div>
                </div>
                <div class="content__text">${diaryContent}</div>
            </div>
        </div>
`
        switch(diaryMood) {
            case "happy": {
                document.querySelector(".mood__text").style = "color: #EA5757"
                break
            }
            case "sad": {
                document.querySelector(".mood__text").style = "color: #28B4E1"
                break
            }
            case "surprise": {
                document.querySelector(".mood__text").style = "color: #D59029"
                break
            }
            case "angry": {
                document.querySelector(".mood__text").style = "color: #222"
                break
            }
            case "etc": {
                document.querySelector(".mood__text").style = "color: #A229ED"
                break
            }
        }
    } else {
        console.log( "받아올 데이터가 없어요!!" )
    };
};

makeDiaryDetail();


function editDiaryData () {
    console.log("edit test")

    // localStorage.getItem("diaryData")
    // console.log( JSON.parse(localStorage.getItem("diaryData")) )
}

function deleteDiaryData () {
    console.log("delete test")
}

function submitComment () {
    console.log("submit test")

    // const comment = document.querySelector(".input__text").value
    // const time = new Date().toISOString().split("T")[0].replace(/-/g, ". ");

    // let diaryComment = {
    //     comment,
    //     time,
    // }

    // console.log( comment, time )
    // console.log( diaryComment.comment, diaryComment.time )
    // console.log( getDiary )

    // let diaryData = []
    // diaryData.push( getDiary )
    // console.log( diaryData )

    // diaryData[indexNum].push( {"diaryComment": diaryComment} )
    // console.log( diaryData )
}

document.querySelector(".btn__edit").addEventListener('click', editDiaryData)
document.querySelector(".btn__delete").addEventListener('click', deleteDiaryData)
document.querySelector(".input__btn").addEventListener('click', submitComment)