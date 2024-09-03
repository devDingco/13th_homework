const getDiary = JSON.parse(localStorage.getItem("diaryData"))
const indexNum = window.location.search.substring(6) -1

const diaryMood = getDiary[indexNum].mood
const diaryDate = getDiary[indexNum].date
const diaryTitle = getDiary[indexNum].title
const diaryContext = getDiary[indexNum].context

const moodIndex = {
    happy: "행복해요",
    sad: "슬퍼요",
    surprise: "놀랐어요",
    angry: "화나요",
    etc: "기타"
};

function makeDiaryDetail() {
    if ( getDiary !== null ) {
        const diaryDetail = document.querySelector(".container__content")
        diaryDetail.innerHTML =
`
<div class="container__content">
            <div class="content__title">${diaryTitle}</div>
            <div class="content__status">
                <div class="content__mood">
                    <div class="mood__img">
                        <img src="../asset/icon__${diaryMood}.png" />
                    </div>
                    <div class="mood__text">${moodIndex[diaryMood]}</div>
                </div>
                <div class="content__post">
                    <div class="post__date">${diaryDate}</div>
                    <div class="post__text">작성</div>
                </div>
            </div>
            <div class="content__context">
                <div class="context__head">
                    <div class="context__title">내용</div>
                    <div class="context__btn">
                        <div class="context__edit">수정</div>
                        <div class="context__delete">삭제</div>
                    </div>
                </div>
                <div class="context__text">${diaryContext}</div>
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
            case "etc": {
                document.querySelector(".mood__text").style = "color: #A229ED"
                break
            }
        }
    } else {
        console.log( "local is null" )
    };
};

makeDiaryDetail();


function editDiaryData () {
    console.log("edit test")

    localStorage.getItem("diaryData")
    console.log( JSON.parse(localStorage.getItem("diaryData")) )
}

function deleteDiaryData () {
    console.log("delete test")
}

function submitComment () {
    const comment = document.querySelector(".comment__input").value
    const time = new Date().toISOString().split("T")[0].replace(/-/g, ". ");

    let diaryComment = {
        comment,
        time,
    }

    console.log( comment, time )
    console.log( diaryComment.comment, diaryComment.time )
    console.log( getDiary )

    let diaryData = []
    diaryData.push( getDiary )
    console.log( diaryData )

    diaryData[indexNum].push( {"diaryComment": diaryComment} )
    console.log( diaryData )
}

document.querySelector(".context__edit").addEventListener('click', editDiaryData)
document.querySelector(".context__delete").addEventListener('click', deleteDiaryData)
document.querySelector(".comment__btn").addEventListener('click', submitComment)