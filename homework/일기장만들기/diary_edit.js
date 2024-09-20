

const queryString = location.search;
const queryStringData = new URLSearchParams(queryString)
console.log(queryStringData)
const ListId = queryStringData.get("idV")

// 쿼리스트링으로 받아온 인덱스값을 배열에서 꺼내준다
const localdata01 =  localStorage.getItem("detailList") ?? "[]"
const localdata02 =  JSON.parse(localdata01)


window.onload = () => {
    localHtml()
    localdata02.forEach(element => {
        if(element.idV === ListId){
            commentList(element)
        }
    })
}


//로컬스토리지 map으로 돌려서 일기수정페이지 HTML만들기
const localHtml = () => {
    localdata02.map(el => {
        if(el.idV === ListId){

            document.getElementById("contentBoxId").innerHTML =
            // 원래 저장된 일기 내용을 브라우저에 불러오기 
           `
            <div class="editBox01">
                    <h1>오늘기분은어땠나요?</h1>
                    <div class="myEmoInput">
                        <input  id="myEmo01" type="radio" name="myEmoGrop"><label>행복해요</label>
                        <input  id="myEmo02" type="radio" name="myEmoGrop"><label>슬퍼요</label>
                        <input  id="myEmo03" type="radio" name="myEmoGrop"><label>놀랐어요</label>
                        <input  id="myEmo04" type="radio" name="myEmoGrop"><label>화나요</label>
                        <input  id="myEmo05" type="radio" name="myEmoGrop"><label>기타</label>
                    </div>
                </div>
                <div class="editBox02">
                    <h2>제목</h2>
                    <input id="inputTitle" type="text" placeholder="">
                </div>
                <div class="editBox03">
                    <h2>내용</h2>
                    <textarea id="inputWrite" placeholder=""></textarea>
                </div>
                <div class="editBox04">
                    <button onclick="editNo()">취소</button>
                    <button onclick="editDiary()">수정하기</button>
                </div>
                <hr/>

        `
            // 객체값을 잡아온 아이디 HTML에 그냥 넣으면 화면나옴
            document.getElementById("inputTitle").value = el.제목
            document.getElementById("inputWrite").value = el.내용
            
            switch(el.기분){
                case "행복해요" : {
                    document.getElementById("myEmo01").checked = true;
                    break;
                }
                case "슬퍼요" : {
                    document.getElementById("myEmo02").checked = true;
                    break;
                }
                case "놀랐어요" : {
                    document.getElementById("myEmo03").checked = true;
                    break;
                }
                case "화나요" : {
                    document.getElementById("myEmo04").checked = true;
                    break;
                }
                case "기타" : {
                    document.getElementById("myEmo05").checked = true;
                    break;
                }
            }
        }
    })


     // 라디오버튼 배열을 돌려서 벨류값이 element.기분이랑 같을때 체크해주기
            // 하려다 실패한 어떤것 HTMLCollection
            // const myEmo = document.getElementsByClassName("myEmoGrop")
            // console.log(myEmo)
            // myEmo.forEach(me => {
            //     if(element.기분 == me.value){
            //         me.checked = true
            //     }
            // })
}


// 수정하기버튼 누를때 기능
const editDiary = () => {
    // 인풋창에 적힌 변경된값 - 수정하기버튼이 누른후 실행되기 때문에 변경된 값이 들어있다.
    const today = new Date();
    const todayDate = `
    ${today.getFullYear()}-
    ${(today.getMonth() + 1)}-
    ${today.getDate()}
    `
    let titleC = document.getElementById("inputTitle").value 
    let writeC = document.getElementById("inputWrite").value
    let radioC;
    const myEmoRadio = document.getElementsByName("myEmoGrop")
    // console.log(myEmoRadio)
    myEmoRadio.forEach(el => {
        if(el.checked)// 조건안에 그냥 변수가 들어갈경우 디폴드값 true이다.
        {
            radioC = el.nextSibling.innerText
            //nextSibling : 형제요소로 가져와 - 근데 태그도 같이 가져옴 값을 찍을려면 innerText로 찍어줘
        }
    })

    // 레포에 있는 일기객체에 덮어씌우기
    const allData = localdata02.map(el => {
        // console.log(localdata02.내용)
        if(el.idV === ListId){
            console.log(el)
            el = {
                    idV : ListId,
                    기분    : radioC,
                    제목    : titleC,
                    내용    : writeC,
                    작성날짜 : todayDate
            }
        console.log(el)
        }
        return el
    })
            //로컬 스토리지에 넣어주기
            localStorage.setItem("detailList", JSON.stringify(allData))  // 로컬 스토리지에 저장할때 배열로 저장하는게 좋음
            window.location.href=`./day05_일기상세페이지.html?idV=${ListId}`
}

//일기 수정을 취소할때 누르는 기능
const editNo = () => {
    window.location.href=`./day05_일기상세페이지.html?idV=${ListId}`
}


// 일기 회고목록 띄워두기
const commentList = (element) => {
    console.log(element)
    const commentList01 = element.댓글.map(el => `
        <div class="commentPlus">
            <span>${el.comment}</span>
            <span>${el.toDay}</span>
        </div>
        `).join("")
    document.getElementById("commentBoxId").innerHTML  = commentList01
            
}
