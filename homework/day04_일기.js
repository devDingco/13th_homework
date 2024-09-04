
//여기서 시작!!!!

// 1. 일기쓰기(기분,제목,내용)의 값을 받을변수를 선언한다
// 2. 등록하기버튼을 눌렀을때 값이 모두 들어간 객체를 생성한다
let 체크된값; // 변수를 밖에 선언하면 아래(함수)로 쓸 수 있음 
let 제목입력값;
let 내용입력값;
let 기분이미지;
let 일기목록 = []; // 들고갈 데이터 덩어리(객체)를 넣어줄 빈배열
// let 목록여러개추가 = [];
// let div추가하기;

let 작성날짜값;

const 등록하기버튼 = () => {

    // 일기작성날짜
    const toDayDate = new Date();
    작성날짜값 = 
    `${toDayDate.getFullYear()}.${(toDayDate.getMonth())+1}.${toDayDate.getDate()}`
    
    //getElementsByName 배열로 사용가능
    //기분 radio foreach로 돌리기
    const 기분버튼목록 = document.getElementsByName("radioCheck")

    기분버튼목록.forEach( num => {
        if(num.checked === true){
            //일기목록에 true로 체크된값 넣어주기
            체크된값 = num.value
            let 기분이미지 = ""
            let myFontColor =""
                switch(체크된값){
                    case "행복해요": {
                        기분이미지 = `<img src="./CSS&JS 마스터/행복해요 (m).png" width="32px">`
                        myFontColor = `#EA5757`
                        break;
                    }
                    case "슬퍼요": {
                        기분이미지 = `<img src="./CSS&JS 마스터/슬퍼요 (m).png" width="32px">`
                        myFontColor = `#28B4E1`
                        break;
                    }
                    case "놀랐어요": {
                        기분이미지 = `<img src="./CSS&JS 마스터/놀랐어요 (m).png" width="32px">`
                        myFontColor = `#D59029`
                        break;
                    }
                    case "화나요": {
                        기분이미지 = `<img src="./CSS&JS 마스터/화나요 (m).png" width="32px">`
                        myFontColor = `#777777`
                        break;
                    }
                    case "기타": {
                        기분이미지 = `<img src="./CSS&JS 마스터/기타 (m).png" width="32px">`
                        myFontColor = `#A229ED`
                        break;
                    }
                }
                const id = String(Math.floor(Math.random() * 1000000)).padStart(6 ,"0")
                console.log(id)
                일기목록.push({
                    idV : id,
                    기분    : 체크된값,
                    제목    : 제목입력값,
                    내용    : 내용입력값,
                    작성날짜 : 작성날짜값,
                    기분나타냄 : 기분이미지,
                    기분색 : myFontColor
            })
            console.log(일기목록)

            // console.log(일기목록)
           
            // 로컬스토리지에 일기객체 담기 일기목록에 값을 넣어서 뿌려주기위해서
            let detailListData = window.localStorage.getItem("detailList") ?? "[]";
            //  detailList 가 로컬스토리지에없으면 빈 배열 넣어줘
            localStorage.setItem("detailList", JSON.stringify(일기목록))
            detailListData = localStorage.getItem("detailList")
            console.log(detailListData)
            let detaiDataChang = JSON.parse(detailListData)
            // 문자열로 저장된 detailList이름을 가진 일기는 JSON으로 만들어서 로컬스토리지에서 빼오고 변수에 넣어준다

            DiaryPlus(detaiDataChang)
            // console.log(detaiDataChang)
        }
    })
}

const 인풋검사하기 = () => {
    제목입력값 = document.getElementById("제목입력inputId").value 
    // console.log(제목입력값);

    내용입력값 = document.getElementById("내용입력inputId").value
    // console.log(내용입력값);
}

// 일기 목록을 눌렀을 때 실행되는 부분
// detailListData : 로컬스토리지에서 가져온 데이터 (일기객체_일기객체데이터가 필요한곳에 map)
const DiaryPlus = (localData) => {

    // 일기 목록을 뿌려주는 곳 잡아오기
    const localDataArr = localData.map(el  => `
                        <a href="./day05_일기상세페이지.html?idV=${el.idV}">
                            <div id="iconBoxFImgID" class="iconBoxFImg">
                                ${el.기분나타냄}
                                <div class="iconBoxF두번째">
                                    <div class="iconBoxF세번째">
                                        <div style="color:${el.기분색}">${el.기분}</div>
                                        <div>${el.작성날짜}</div>
                                    </div>
                                    <div class="iconBoxF네번째">${el.제목}</div>
                                </div>
                            </div>
                        </a>
    `).join("")

    // console.log(localDataArr)
    // console.log(localDataArr.join(""))
    // 콘솔로 찍었을 때 데이터요소가 추가된 html이 배열로 같이 찍힘
    // join 배열의 모든 요소를 연결해 하나의 문자열로 만듦 : 정,아,영 -> 배열을 그냥 html찍으면 ',' 도 같이 찍힘
    console.log(일기목록)

    let diaryPlusList = document.getElementById("iconBoxFId") 
    diaryPlusList.innerHTML = localDataArr

   
}



// 전체화면 기분상태를 필터링하는곳
const navFilter = (event) => {
    const navOption = event.target.value

    const detailListData01 = localStorage.getItem("detailList") ?? "[]"
    const detailListData02 =  JSON.parse(detailListData01)

    let navFilterPrint;
    switch(navOption){
        case "행복해요" : {
            navFilterPrint = detailListData02.filter(el => el.기분 === "행복해요")
            break;
        }
        case "슬퍼요" : {
            navFilterPrint = detailListData02.filter(el => el.기분 === "슬퍼요")
            break;
        }
        case "놀랐어요" : {
            navFilterPrint = detailListData02.filter(el => el.기분 === "놀랐어요")
            break;
        }
        case "화나요" : {
            navFilterPrint = detailListData02.filter(el => el.기분 === "화나요")
            break;
        }
        case "기타" : {
            navFilterPrint = detailListData02.filter(el => el.기분 === "기타")
            break;
        }

    }

    console.log(navFilterPrint)
    const diaryFilterList = navFilterPrint.map(el => ` 
                        <a href="./day05_일기상세페이지.html?idV=${el.idV}">
                            <div id="iconBoxFImgID" class="iconBoxFImg">
                                ${el.기분나타냄}
                                <div class="iconBoxF두번째">
                                    <div class="iconBoxF세번째">
                                        <div style="color:${el.기분색}">${el.기분}</div>
                                        <div>${el.작성날짜}</div>
                                    </div>
                                    <div class="iconBoxF네번째">${el.제목}</div>
                                </div>
                            </div>
                        </a>
    `).join("")

    document.getElementById("iconBoxFId").innerHTML = diaryFilterList
}


// 일기쓰기객체(배열에 넣었음) 인덱스 값으로 해당 클릭하는 일기목록으로 알맞게 내용 넣어주기 - 위에 객체로 덩어리만들어서 innerHtml할때 그냥 다 넣어서 처음부터 만들어줌
// 일기목록(일기쓰기 객체)

// 일기목록 중 하나를 선택하는 이벤트 넣기 onclick() * 어차피 들어가 있는 객체 하나
    // 일기장을 alert으로 해당 객체 (일기)띄우기
    
//     const 일기 = 일기목록[일기인덱스];
//     console.log(일기)
//     localStorage.setItem("detailList", JSON.stringify(일기))

//     //1.상세페이지 이동 - 페이지클릭후 이동 로컬스토리지 로우팅?
//     // window.location.href = "./day05_일기상세페이지.html";
//     window.open("./day05_일기상세페이지.html")
//     //2. 로컬스토리지에 setItem으로 '내가만든일기객체 = 일기목록[일기인덱스]' 넣어줌
//     //3. 로컬스토리지에 담긴 내 일기객체 JSON으로 담아서 꺼내줌 (상세페이지에서 꺼냈던가?)
   



//     //4. 맞게 들어왔는지 콘솔로찍어보기

//     //로컬스토리지로 넣으면 문자열로 들어감
//     //JSon이라는 객체로 빼서 데이터 구성해야함


//     // // 보고싶은일기를(iconBoxFImgID) 누르면 글내용 띄우기
//     // //getElementsByClassName 유사배열로 가져오려고 사용
//     // const 일기목록의클릭항목 = document.getElementsByClassName("iconBoxFImg")
//     // //유사배열을 배열로 만들려고 사용 : Array.from()

//     // //for문으로 일기목록 인덱스값 클릭, 이미 객체로 들어가있는 일기를 alert으로 내용 띄움
//     // for(let i = 0; i< 일기목록의클릭항목.length; i++){
//     //     console.log(일기목록의클릭항목[i])// i를 찍으면, 배열 인덱스값 전체가 콘솔로 찍힘
//     //     // 일기목록의클릭항목[i].addEventListener("click", function(event){
//     //     //     console.log(26)
//     //         //일기목록 : [{},{},{}]
//     //         //일기목록의클릭항목[i] 클릭 클릭한 일기에 들어있는 객체덩어리는 하나
//     //         // 일기목록.forEach(일기장 => {
//     //         //     alert(일기장)
//     //         // })
//     //     // })
//     // }
//     // // Array.from(일기목록의클릭항목).forEach(el => {
//     // //     console.log(1)//들어옴
//     // //     el.addEventListener("click", () => 
//     // //         alert(2))

//     // // });

//     // // 클릭할 곳 잡아오기 - 아이디 : 유일한것 , 클래스: 같은것 여러개
//     // // 인덱스 값으로 클릭한 일기목록 알아내기

// }

    // for (let i = 0; i < 기분버튼목록.length; i++) {
    //     if (기분버튼목록[i].checked === true) {
    //         체크된값 = 기분버튼목록[i].value
    //         // console.log(체크된값)
            
    //         일기목록.push(
    //             {
    //                 기분 : 체크된값,
    //                 제목 : 제목입력값,
    //                 내용 : 내용입력값,
                    
    //             }
    //         )


            // div추가하기 변수 안에 innerHtml할 내용을 넣어주어야 스코프밖에서도 사용할수있다.
            // 일기쓰기안에 만들어진 객체의 값이 반복됨

            // 2. 일기목록 배열에 있는 수 만큼 목록여러개추가 변수에 div 가 담긴 문자열을 더한다.




            // for(let i = 0; i < 일기목록.length; i++){

            //     // 배열의 반복 횟수에 따라 일기목록에 있는 값을 일기 변수로 만든다.
            //     // 일기목록[i]는 찍어보면 인덱스가 아닌 객체 자체임! 이걸 일기변수에 넣어서 값을 꺼냄 (찐 인덱스만 가져오고 싶으면 i)
            //     const 일기 = 일기목록[i]

            //     // 더해야하는 div 문자열을 추가한다.(반복해서 담아야하므로 변수에 넣어서 가공한다)
            //     // 일기목록[i]로 전달하면 인덱스가 아닌 객체 자체로 전달된다

            //     //map으로 변경하기
            //     div추가하기 = `
            //     <div id="iconBoxFImgID" class="iconBoxFImg" onclick="글보기기능(${i})">
            //      <img src="./img/day04img/행복해요 (m).png" alt="">
            //         <div class="iconBoxF두번째">
            //             <div class="iconBoxF세번째">
            //                 <div>${일기.기분}</div>
            //                 <div>${일기.작성날짜}</div>
            //             </div>
            //             <div class="iconBoxF네번째">${일기.제목}</div>
            //         </div>
            //     </div>
            //     `
            // }
           
               
            // // 위에서 만든 '빈 문자열이 담긴 목록여러개추가 변수'에 바로 위에서 만든 div추가하기 문자열을 더한다.
            // // 빈 배열에 일기목록을 푸시한다 문자열로 들어감
            // const iconBox목록추가 = document.getElementById("iconBoxFId")
            // 목록여러개추가 = 목록여러개추가 + div추가하기
            // iconBox목록추가.innerHTML = 목록여러개추가

            // //??? 얘를'일기목록.length; for문안에가' 아니라 밖에 쓰는 이유를 아직도 모르겠음

            // // 3. 다 더해진 목록여러개 추가를 iconBox목록추가의 innerHTML 에 넣어준다.
            // // 목록여러개추가를 쓰기 위해서 아예 밖에 전역변수로 선언해주어야한다
            // // 일기목록에목록찍기 = 일기목록에목록찍기 + div추가하기
            // // 목록여러개추가.push한 배열을 반복문 돌려서 찍기??
            // // i = i + 1
            // // 일기목록에목록찍기 = 일기목록에목록찍기 + 목록여러개추가[i]
            // // console.log(일기목록에목록찍기)



           
   
        
//     }
// }


