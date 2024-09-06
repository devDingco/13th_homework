const getDiary = JSON.parse(localStorage.getItem("diaryData"))
const indexNum = window.location.search.substring(6)

const currentDiary = getDiary[indexNum]


const diaryMood = currentDiary.mood
const diaryDate = currentDiary.date
const diaryTitle = currentDiary.title
const diaryContent = currentDiary.content

const time = new Date().toISOString().split("T")[0].replace(/-/g, ". ")

makeDiaryDetail();
makeDiaryComment()

function makeDiaryDetail() {
    const moodIndex = {
        happy: "행복해요",
        sad: "슬퍼요",
        surprise: "놀랐어요",
        angry: "화나요",
        etc: "기타"
    };

    if ( currentDiary !== null ) {
        const diaryDetail = document.querySelector(".container__body")
        diaryDetail.innerHTML =
`
<div class="container__body">
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
                    <div class="title__button">
                        <div class="btn__delete">삭제</div>
                        <div class="btn__edit">수정</div>
                    </div>
                </div>
                <div class="content__text">${diaryContent}</div>
            </div>
        </div>
`

        document.querySelector(".btn__delete").addEventListener('click', deleteDiary)
        document.querySelector(".btn__edit").addEventListener('click', editDiary)

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

function deleteDiary () {
    getDiary.splice(indexNum, 1)

    localStorage.setItem("diaryData", JSON.stringify(getDiary))
    window.location.href = "../myDiary.html"
};

function editDiary () { 
    document.querySelector(".container__body").hidden = true
    document.querySelector(".container__comment").hidden = true
    document.querySelector(".container__edit").hidden = false
    document.querySelector(".header__text").innerText = "일기 수정"
    
    switch(currentDiary.mood) {
        case "happy": {
            document.getElementById("radioHappy").checked = true
            break
        }
        case "sad": {
            document.getElementById("radioSad").checked = true
            break
        }
        case "surprise": {
            document.getElementById("radioSurprise").checked = true
            break
        }
        case "angry": {
            document.getElementById("radioAngry").checked = true
            break
        }
        case "etc": {
            document.getElementById("radioEtc").checked = true
            break
        }
    }

    document.querySelector(".title__input").value = currentDiary.title
    document.querySelector(".content__input").value = currentDiary.content
};

function cancelEdit () {
    document.querySelector(".container__body").hidden = false
    document.querySelector(".container__comment").hidden = false
    document.querySelector(".container__edit").hidden = true

    document.querySelector(".title__input").value = ""
    document.querySelector(".content__input").value = ""
};

function submitEdit () {
    const mood = document.getElementsByName("mood")

    let editMood;
    for ( i=0 ; i < mood.length ; i++ ) {
        if ( mood[i].checked ) {
            editMood = mood[i].value;
        }
    };
    let editDate = time
    let editTitle = document.querySelector(".title__input").value
    let editContent = document.querySelector(".content__input").value

    const getDiary = JSON.parse(localStorage.getItem("diaryData"))
    const indexNum = window.location.search.substring(6)

    const currentDiary = getDiary[indexNum]

    currentDiary.mood = editMood
    currentDiary.date = editDate
    currentDiary.title = editTitle
    currentDiary.content = editContent

    localStorage.setItem("diaryData", JSON.stringify(getDiary))
    cancelEdit()
    window.location.reload()
};

function submitComment () {
    const memo = document.querySelector(".input__text").value

    const diaryComment = {
        memo,
        time,
    }

    let diaryWithComment = getDiary
    diaryWithComment[indexNum].comment.push(diaryComment)

    console.log ( diaryWithComment )
    console.log ( typeof( diaryWithComment ) )

    console.log ( diaryWithComment[indexNum] )
    console.log ( typeof( diaryWithComment[indexNum] ) )

    console.log ( diaryWithComment[indexNum].comment )
    console.log ( typeof( diaryWithComment[indexNum].comment ) )

    localStorage.setItem("diaryData", JSON.stringify(diaryWithComment))
    document.querySelector(".input__text").value = ""

    makeDiaryComment(diaryWithComment)
};

function makeDiaryComment () {
    if ( currentDiary.comment[0] !== undefined ) {
        const currentDiaryComment = currentDiary.comment

        const commentList = document.querySelector(".comment__list")
        commentList.innerHTML = currentDiaryComment.map( el =>
`
<div class="list__section">
    <div class="list__text">${el.memo}</div>
    <div class="list__date">${el.time} 작성</div>
</div>
`
        ).join("")
    } else {
        const commentList = document.querySelector(".comment__list")
        commentList.innerHTML =
`
<div class="list__section" style="color: #bbb"> 아직 작성된 댓글이 없어요!!</div>
`
    }
};

document.querySelector(".btn__cancel").addEventListener('click', cancelEdit)
document.querySelector(".btn__submit").addEventListener('click', submitEdit)
document.querySelector(".btn__input").addEventListener('click', submitComment)