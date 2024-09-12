const queryString = location.search;
const queryStringData = new URLSearchParams(queryString)
const ListId = queryStringData.get("idV")
// console.log(ListId)

// 쿼리스트링으로 받아온 인덱스값을 배열에서 꺼내준다
const localdata001 =  localStorage.getItem("detailList") ?? "[]"
let localdata002 =  JSON.parse(localdata001)
// const diaryOpen = localdate02[ListId] -> 인덱스값이 아니라서 오류
// console.log(typeof(localdata002))->타입을찍어주는메소드 : typeof



window.onload = () => {

    // 로컬 스토리지 안에있는 배열요소와 id 매치하기
    localdata002.forEach(element => {
        // console.log(element)
        if(element.idV === ListId){
            // console.log(element)
            detailListDivPring(element)
            commentList(element)
        }
    })
}



//일기내용 프린트하기
const detailListDivPring = (element) => {
    let 기분이미지 = "";
    // 상세페이지 작은감정이미지 맞게 뿌리기
    switch(element.기분){
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
    document.getElementById("localPrintBox").innerHTML =`
        <section class="titleBox">
                    <div class="titlePrint">${element.제목}</div>
                    <div class="myEmotion">
                        <div class="myEmotionPrint">
                            ${기분이미지}
                            <span>${element.기분}</span>
                        </div>
                        <div class="writeDayPrint">${element.작성날짜} 작성</div>
                    </div>
                </section>
                <section class="detailBox">
                    <div>내용</div>
                    <div id="contentCopy" class="wirtePrint">${element.내용}</div>
                </section>
                <div class="copy">
                    <div onclick="detailCopy();clipBoardCopy();">내용복사</div>
                </div>
                <div id="copyToastOpen" class="copyToastDefault">복사되었습니다</div>
                <section class="detailBoxBtn">
                    <a href="./day05_일기수정p.html?idV=${ListId}" >
                        <button>수정</button>
                    </a>
                    <button onclick="modalOpen()">삭제</button>
                </section>
        </section>
        <hr />
        `
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

// 일기 회고등록하고 띄우기
const commentPlus = () => {

    const localGet =  localStorage.getItem("detailList") ?? "[]"
    const localGetParse =  JSON.parse(localGet)
    console.log(localGetParse)


    const commentValue = document.getElementById("commentInput").value
    const today      = new Date()
    const todayWrite = `${today.getFullYear()}-${(today.getMonth() + 1 )}-${today.getDate()}`
    // commmentEntry = {commentValue, todayWrite }

    // const localMatch = localGetParse.filter(item  => item.idV === ListId)

    //빈배열에 로컬데이터넣을거임
    let localData
    localData = localGetParse
    
    // 로컬 스토리지에서 데이터를 가져왔고, 파싱한 배열 값이 localData 변수에 있다.

    // localData 배열의 객체 중 쿼리 스트링으로 전달 받은 ID와 객체의 ID가 같은 경우 해당 객체의 인덱스 값을 변수 i에 할당한다.
    let i
    localData.map( (el , index) => {
        if(el.idV === ListId){
            i = index
        }
    })

    localData[i].댓글.push(
        {
            comment : commentValue,
            toDay :  todayWrite
        }
    ) 

    localGetParse[i] = localData[i]
    // 이미 처음에 잡아온 로컬스토리지데이터가 인덱스를 매칭시켜서 바꿈 // 오로지 자바스크립트데이터
    // 로컬에다 넣은값 넣어라...
    const commentPrint = localGetParse[i].댓글.map(el => 
        `
        <div class="commentPlus">
            <span>${el.comment}</span>
            <span>${el.toDay}</span>
        </div>
        `
    ).join("")

    console.log(commentPrint)
    console.log(localGetParse[i])
    console.log(localGetParse[i].댓글)
    document.getElementById("commentBoxId").innerHTML  = commentPrint

    localStorage.setItem("detailList",JSON.stringify(localGetParse))
   
}

// 내용복사기능
const detailCopy = () => {
    const toastMeg =  document.getElementById("copyToastOpen")
    toastMeg.classList.remove('copyToastDefault')
    toastMeg.classList.add('copyToast');

    const toast = setTimeout(() => {
        toastMeg.classList.remove('copyToast')
    toastMeg.classList.add('copyToastDefault');

    },3000)
}

// 브라우저객체로 내용 클립보드로 복사하기 
const clipBoardCopy = () => {
    localdata002.forEach(element => {
        if(element.idV === ListId){
            console.log(element.내용)
            window.navigator.clipboard.writeText(element.내용)
        }
    })
}   


// 일기삭제버튼 누르고 모달기능
const modalOpen = () => {
    document.getElementById("modalNull").style = "display : block"

    // 모달 버튼 눌렀을 때 기능
    document.getElementById("noBtn").addEventListener("click",() => {
        document.getElementById("modalNull").style = "display : none"
    })

    document.getElementById("nullBtn").addEventListener("click",() => {
        document.getElementById("modalNull").style = "display : none"
        deleteBtn()
    })


}


// 일기 스토리지에서 삭제
const deleteBtn = () => {
    // 스토리지 돌려서 같은 아이디를 찾아서 같은 아이디를 매치 시키고 그 아이디값을 삭제
    const deletSto = localdata002.filter(el => el.idV !== ListId)
    // el.idV가 ListId 아닌것으로 배열을 만들어서 돌려줘 -> 콜백함수
    localStorage.setItem("detailList",JSON.stringify(deletSto))
    window.location.href= "./day04_일기.html"
}

 // 로컬스토리지에 넣어주면 인덱스값을 갖고 추가된다 - 요소[0],요소[1],요소[2],요소[3]
    
    //HTMl에 뿌리려면 로컬에서 가져와야함
    // localStorage.getItem
    // console.log(localGetParse)

    /****설명 : push
     * const animals = ['pigs', 'goats', 'sheep'];
     * const count = animals.push({'cows':'cows'});
     * console.log(count);
     * 배열에 push를 객체로 하고 변수에 담고 그걸 콘솔로 찍으면 length값이나온다 - 결과 : 4
     * 반대로 
     * 콘솔에 animals를 찍을경우 배열이 나온다 - 결과 : Array ["pigs", "goats", "sheep", Object { cows: "cows" }]
     * filter사용시, 배열을 뱉어낸다.
     *  */ 

    //자바스크립트내에서만 남아있는 데이터(foreach가 배열을 못뱉어내서
    // newpush.forEach(el => {
    //     commetnMap = el.댓글.map(el => `
    // })
