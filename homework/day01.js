
function 회원가입() {

    // 회원가입에 필요한 정보들 담아두기
    const 이름    = document.getElementById("이름").value
    const 이메일  = document.getElementById("이메일").value
    const 비밀번호 = document.getElementById("비밀번호").value
    const 전화번호 = document.getElementById("전화번호").value
    const 자기소개 = document.getElementById("자기소개").value
    const 남자 = document.getElementById("남자").checked
    const 여자 = document.getElementById("여자").checked
    const 동의 = document.getElementById("동의").checked

    // 가입날짜 나타내기
    const joinBoxBtn = document.getElementById("joinBoxBtn")
    const 나의날짜 = new Date();

    // console.log(이름)
    // console.log(이메일)
    // console.log(비밀번호)
    // console.log(전화번호)
    // console.log(자기소개)
    //  console.log(남자)
    //  console.log(여자)
    //  console.log(동의)




    // input 조건 만들기
    const 이름란   = 이름 !== "";
    const 이메일란  = 이메일 !== "";
    const 비밀번호란 = 비밀번호 !== "";
    const 전화번호란 = 전화번호 !== "";
    const 자기소개란 = 자기소개 !== "";
    const 성별란 = (남자 === true) || (여자 === true)
    const 동의란 = 동의 === true

    if(이름란 === true && 이메일란 === true && 비밀번호란 === true && 전화번호란 === true && 자기소개란 === true && 성별란 === true && 동의란 === true){
        console.log("끝") 
        
        alert(`codecamp 내용 : 

        회원가입 축하합니다. 
        (가입일시 : ${나의날짜.getFullYear()} - ${(나의날짜.getMonth()) +1 } - ${나의날짜.getDate()})`)

        document.getElementById("가입멤버없음").innerHTML = '<img src="./img/프로필 이미지 (export 하세요).png" ></img>수강생1'
        document.getElementById("가입멤버없음").className = '가입멤버있음'
        document.querySelector("#가입멤버없음").setAttribute("id","가입멤버있음"); // 아이디 잡아와서 아이디 이름 바꾸기
        const 가입멤버있음프로필 = document.getElementById("가입멤버있음")

        //const 성별나타냄 = (성별란 === true) || (성별란 === true)
        // let 동의나타냄; 
        // if(동의 === true){
        //    동의나타냄 = Y
        // }

        가입멤버있음프로필.onclick =  function(event){
            alert(
                `
                codecamp 내용 : 

                이름 : ${이름}
                이메일 : ${이메일}
                비밀번호 : ${비밀번호}
                전화번호 : ${전화번호}
                자기소개 : ${자기소개}
                남자 : ${남자}
                여자 : ${여자}
                동의 : ${동의}
                (가입일시 : ${나의날짜.getFullYear()} - ${(나의날짜.getMonth()) +1 } - ${나의날짜.getDate()})
            `)
        }
    }else{
        // 미입력시 alert
        console.log("다시하기")

        alert(
            `
            codecamp 내용 : 
            
            이름 : ${이름}
            이메일 : ${이메일}
            비밀번호 : ${비밀번호}
            전화번호 : ${전화번호}
            자기소개 : ${자기소개}
            남자 : ${남자}
            여자 : ${여자}
            동의 : ${동의}
            (가입일시 : ${나의날짜.getFullYear()} - ${(나의날짜.getMonth()) +1 } - ${나의날짜.getDate()})
        `)
    }
}

let 클리어하기;

// 인증번호 요청 만들기
function randomBtn(){
    
    clearInterval(클리어하기)
    const num01 = Math.floor((Math.random() * 1000000));
    const numberRandom = String(num01).padStart(6, "0")
    // console.log(numberRandom)
    document.getElementById("랜덤인증번호").innerText = numberRandom;
    document.getElementById("랜덤인증번호").style = "color : #955C98"
    document.getElementById("타이머").innerText = "03:00"
    document.getElementById("타이머").style = "color : #E84F4F"




    // ** 인증번호 요청 버튼 누르고나서 타이머 같이 띄우기
    let 시간 = 179 // ? 179인이유 // 백에서 넘어오는 시간을 계산해서 (1초 걸린다가정) 179초로 넘김 // 화면에 3:00쓰임 1초 늦게시작

    클리어하기 = setInterval(function(){

                if( 시간 > 0){ //00:00까지

                    const 분 = String(Math.floor(시간 / 60)).padStart(2,"0"); //몫이 분
                    const 초 = String(시간 % 60).padStart(2,"0"); //나머지가 초

                    document.getElementById("타이머").innerText = `${분} : ${초}`
                    시간 = 시간 -1 
                
                
                }else{//00:01까지 돌고 00:00이 되었을때 else로 넘어옴

                    document.getElementById("인증btn02").disabled = true
                    document.getElementById("타이머").innerText = "시간초과"
                    //00:01 다음으로 시간초과가 뜨게만듦 : 굳이 00:00나올 필요 없음
                }

                
    },1000)
}


function 인증완료(){
    document.getElementById("인증btn02").innerText = "인증완료"
    document.getElementById("인증btn02").disabled = true

    const 타이머삭제 = document.getElementById("타이머")
    타이머삭제.style.display = 'none'





}


