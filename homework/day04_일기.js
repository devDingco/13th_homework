


    // +일기등록 : 배열에 객체로 일기 push하여 등록할 수 있게 해주세요.

     //내가 요소를 추가할영역
    // iconBoxFId생성 = [];
    // iconBoxFId생성 = iconBoxFId생성.push(newIconBox);
    // const iconBoxFId생성 = document.getElementById("iconBoxFId")
    // const newIconBox  = document.getElementById("iconBoxFImgID");

    // 등록창에 들어있는 value값
    // const checkRadio2 = document.getElementById("슬퍼요체크").value
    // const checkRadio3 = document.getElementById("놀랐어요체크").value
    // const checkRadio4 = document.getElementById("화나요체크").value
    // const checkRadio5 = document.getElementById("기타체크").value
    
    // 등록창에 들어있는 checked값
    // const checkRadio1 = document.getElementById("행복해요체크").checked
    // const checkRadio2 = document.getElementById("슬퍼요체크").checked
    // const checkRadio3 = document.getElementById("놀랐어요체크").checked
    // const checkRadio4 = document.getElementById("화나요체크").checked
    // const checkRadio5 = document.getElementById("기타체크").checked

    // const inputTitle = document.getElementById("제목란").value
    // const inputChag  = document.getElementById("내용란").value


        // const li = document.createElement("div");
        // li.className = 'iconBoxFImg';
        // li.style = 'background-color : red';
        // let newIconBoxArr = []
        // const newIconBox생성 = newIconBoxArr.push(newIconBox)
        // console.log(newIconBox생성)
        // iconBoxFId생성.innerHTML = newIconBox생성





//여기서 시작!!!!

// 1. 일기쓰기(기분,제목,내용)의 값을 받을변수를 선언한다
// 2. 등록하기버튼을 눌렀을때 값이 모두 들어간 객체를 생성한다
let 체크된값; // 변수를 밖에 선언하면 아래(함수)로 쓸 수 있음 
let 제목입력값;
let 내용입력값;
let 기분이미지;
let 일기목록 = []; // 들고갈 데이터 덩어리(객체)를 넣어줄 빈배열
let 목록여러개추가 = "";
let div추가하기;

const 등록하기버튼 = () => {

    const 기분버튼목록 = document.getElementsByName("radioCheck")

    for (let i = 0; i < 기분버튼목록.length; i++) {
        if (기분버튼목록[i].checked === true) {
            체크된값 = 기분버튼목록[i].value
            // console.log(체크된값)
            
            일기목록.push(
                {
                    기분 : 체크된값,
                    제목 : 제목입력값,
                    내용 : 내용입력값
                }
            )
            console.log(일기목록)

            // div추가하기 변수 안에 innerHtml할 내용을 넣어주어야 스코프밖에서도 사용할수있다.
            // 일기쓰기안에 만들어진 객체의 값이 반복됨

            // 2. 일기목록 배열에 있는 수 만큼 목록여러개추가 변수에 div 가 담긴 문자열을 더한다.
            for(let i = 0; i < 일기목록.length; i++){

                // 배열의 반복 횟수에 따라 일기목록에 있는 값을 일기 변수로 만든다.
                // 일기목록[i]는 찍어보면 인덱스가 아닌 객체 자체임! 이걸 일기변수에 넣어서 값을 꺼냄 (찐 인덱스만 가져오고 싶으면 i)
                const 일기 = 일기목록[i]

                // 더해야하는 div 문자열을 추가한다.(반복해서 담아야하므로 변수에 넣어서 가공한다)
                // 일기목록[i]로 전달하면 인덱스가 아닌 객체 자체로 전달된다
                div추가하기 = `
                <div id="iconBoxFImgID" class="iconBoxFImg" onclick="글보기기능(${i})">
                 <img src="./img/day04img/행복해요 (m).png" alt="">
                    <div class="iconBoxF두번째">
                        <div class="iconBoxF세번째">
                            <div>${일기.기분}</div>
                            <div>2024.03.12</div>
                        </div>
                        <div class="iconBoxF네번째">${일기.제목}</div>
                    </div>
                </div>
                `
            }
           
               
            // 위에서 만든 '빈 문자열이 담긴 목록여러개추가 변수'에 바로 위에서 만든 div추가하기 문자열을 더한다.
            // 빈 배열에 일기목록을 푸시한다 문자열로 들어감
            const iconBox목록추가 = document.getElementById("iconBoxFId")
            목록여러개추가 = 목록여러개추가 + div추가하기
            iconBox목록추가.innerHTML = 목록여러개추가

            //??? 얘를'일기목록.length; for문안에가' 아니라 밖에 쓰는 이유를 아직도 모르겠음

            // 3. 다 더해진 목록여러개 추가를 iconBox목록추가의 innerHTML 에 넣어준다.
            // 목록여러개추가를 쓰기 위해서 아예 밖에 전역변수로 선언해주어야한다
            // 일기목록에목록찍기 = 일기목록에목록찍기 + div추가하기
            // 목록여러개추가.push한 배열을 반복문 돌려서 찍기??
            // i = i + 1
            // 일기목록에목록찍기 = 일기목록에목록찍기 + 목록여러개추가[i]
            // console.log(일기목록에목록찍기)



           
   
        }
    }
}


const 인풋검사하기 = () => {
    제목입력값 = document.getElementById("제목입력inputId").value
    console.log(제목입력값);

    내용입력값 = document.getElementById("내용입력inputId").value
    console.log(내용입력값);
}


// 일기쓰기객체(배열에 넣었음) 인덱스 값으로 해당 클릭하는 일기목록으로 알맞게 내용 넣어주기 - 위에 객체로 덩어리만들어서 innerHtml할때 그냥 다 넣어서 처음부터 만들어줌
// 일기목록(일기쓰기 객체)



const 글보기기능 = (일기인덱스) => {
    // 일기목록 중 하나를 선택하는 이벤트 넣기 onclick() * 어차피 들어가 있는 객체 하나
    // 일기장을 alert으로 해당 객체 (일기)띄우기

    const 일기 = 일기목록[일기인덱스];
    console.log(일기)

    //상세페이지 이동 - 페이지클릭후 이동 로컬레포지터리? 로우팅?
    alert(`
        기분 : ${일기.기분}
        제목 : ${일기.제목}
        내용 : ${일기.내용}
    `)
    // 모든 값은 키로 꺼내와라......





    // // 보고싶은일기를(iconBoxFImgID) 누르면 글내용 띄우기
    // //getElementsByClassName 유사배열로 가져오려고 사용
    // const 일기목록의클릭항목 = document.getElementsByClassName("iconBoxFImg")
    // //유사배열을 배열로 만들려고 사용 : Array.from()

    // //for문으로 일기목록 인덱스값 클릭, 이미 객체로 들어가있는 일기를 alert으로 내용 띄움
    // for(let i = 0; i< 일기목록의클릭항목.length; i++){
    //     console.log(일기목록의클릭항목[i])// i를 찍으면, 배열 인덱스값 전체가 콘솔로 찍힘
    //     // 일기목록의클릭항목[i].addEventListener("click", function(event){
    //     //     console.log(26)
    //         //일기목록 : [{},{},{}]
    //         //일기목록의클릭항목[i] 클릭 클릭한 일기에 들어있는 객체덩어리는 하나
    //         // 일기목록.forEach(일기장 => {
    //         //     alert(일기장)
    //         // })
    //     // })
    // }
    // // Array.from(일기목록의클릭항목).forEach(el => {
    // //     console.log(1)//들어옴
    // //     el.addEventListener("click", () => 
    // //         alert(2))

    // // });

    // // 클릭할 곳 잡아오기 - 아이디 : 유일한것 , 클래스: 같은것 여러개
    // // 인덱스 값으로 클릭한 일기목록 알아내기

}