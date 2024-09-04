
window.onload = () => {

    const queryString = location.search;
    const queryStringData = new URLSearchParams(queryString)
    const ListId = queryStringData.get("idV")
    console.log(ListId)

    // 쿼리스트링으로 받아온 인덱스값을 배열에서 꺼내준다
    const localdate01 =  localStorage.getItem("detailList") ?? "[]"
    const localdate02 =  JSON.parse(localdate01) 
    console.log(localdate02)

    localdate02.forEach(element => {
        if(element.idV === ListId){

            document.getElementById("contentBoxId").innerHTML =
            // 원래 저장된 일기 내용을 브라우저에 불러오기 
           `
            <div class="editBox01">
                    <h1>오늘기분은어땠나요?</h1>
                    <div class="myEmoInput">
                        <input onchage="changeDiary()" id="myEmo01" type="radio" name="myEmoGrop"><label>행복해요</label>
                        <input onchage="changeDiary()" id="myEmo02" type="radio" name="myEmoGrop"><label>슬퍼요</label>
                        <input onchage="changeDiary()" id="myEmo03" type="radio" name="myEmoGrop"><label>놀랐어요</label>
                        <input onchage="changeDiary()" id="myEmo04" type="radio" name="myEmoGrop"><label>화나요</label>
                        <input onchage="changeDiary()" id="myEmo05" type="radio" name="myEmoGrop"><label>기타</label>
                    </div>
                </div>
                <div class="editBox02">
                    <h2>제목</h2>
                    <input onchage="changeDiary()" id="inputTitle" type="text" placeholder="">
                </div>
                <div class="editBox03">
                    <h2>내용</h2>
                    <textarea onchage="changeDiary()" id="inputWrite" placeholder=""></textarea>
                </div>
                <div class="editBox04">
                    <button>취소</button>
                    <button>수정하기</button>
                </div>
        `
            // 객체값을 잡아온 아이디 HTML에 그냥 넣으면 화면나옴
            document.getElementById("inputTitle").value = element.제목
            document.getElementById("inputWrite").value = element.내용
            
            switch(element.기분){
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
    })
        


    // 수정된 일기를 다시 객체에 넣어서 배열 바꿔주기
    // document.getElementsByName("myEmoGrop").forEach( num => {
    //     if(num.checked === true){
    //         let checkedEmo =  num.value;

    //     }
    // })
}


// 수정하기 버튼을 눌렀을때 실행
const changeDiary = () => {

    const titleV = document.getElementById("inputTitle").value
    const writeV = document.getElementById("inputWrite").value
    const myEmoRadio = document.getElementsByClassName("myEmoGrop")
    myEmoRadio.forEach(el => {
        
    })
}