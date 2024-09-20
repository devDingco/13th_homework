console.log("pre.camp slack clone coding 이하성");

//... 가입하기 버튼과 게스트
const signupBtn = document.getElementById("signUp");
const guestStudent = document.getElementById("guestStudent");

console.log(signupBtn, guestStudent)

//... 인풋 폼 상단
const nameInput = document.getElementById("name");
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const passConfirmInput = document.getElementById("passConfirm");
const phoneInput01 = document.getElementById("phone01");
const phoneInput02 = document.getElementById("phone02");
const phoneInput03 = document.getElementById("phone03");

//... 인풋 오류시 에러
const error01 = document.querySelector(".error__mail__text01")
const error02 = document.querySelector(".error__mail__text02")
const error03 = document.querySelector(".error__password__text")
const error04 = document.querySelector(".error__phone__text")

//... 인증영역
const authNum = document.getElementById("number");
const requestBtn = document.getElementById("request");
const authTimer = document.getElementById("timer");
const confirmBtn = document.getElementById("auth");

//... 인증영역 하단
const introInput = document.getElementById("introduce");
const radioMale = document.getElementById("male");
const radioFemale = document.getElementById("female");
const checkBox = document.getElementById("check");
const submitBtn = document.getElementById("submit");

//... 날짜 구하기
const year = new Date().getFullYear();
const month = String( new Date().getMonth() +1).padStart(2, "0");
const date = String( new Date().getDate()).padStart(2, "0");

//... 인풋 참조 돌리기
function inputEvent () {
    if (nameInput.value , mailInput.value , passwordInput.value , passConfirmInput.value , phoneInput01.value , phoneInput02.value , phoneInput03.value) {
        requestBtn.style = "background-color: #491449";
    } else {
        requestBtn.style = "background-color: #C7C7C7";
    }
}

//... 가입하기 쌩버튼 누를 때 게스트 아이디 날로 보여주기
function guestSignup () {
    alert(`
회원가입을 축하합니다.
(가입일시 : ${year}-${month}-${date})
`)
    signupBtn.style = "display: none";
    guestStudent.style = "display: flex";
}

function auth () {
    const email = mailInput.value.split("@")

    if (email[1] !== "naver.com" && email[1] !== "gmail.com" && email[1] !== "hanmail.net" && email[1] !== "kakao.com" ) {
        mailInput.style = "border: 1px solid #E84F4F";
        error01.hidden = false;
        error02.hidden = false;
    }    
    if (password.value !== passConfirmInput.value) {
        passwordInput.style = "border: 1px solid #E84F4F";
        passConfirmInput.style = "border: 1px solid #E84F4F";
        error03.hidden = false;
    }
    if (phoneInput01.value !== "010") {
        phoneInput01.style = "border: 1px solid #E84F4F";
        phoneInput02.style = "border: 1px solid #E84F4F";
        phoneInput03.style = "border: 1px solid #E84F4F";
        error04.hidden = false;
    }
    if (error01.hidden !== true && error02.hidden !== true && error03.hidden !== true && error04.hidden !== true) {
        alert("내용을 다시 확인해 주세요!")
    } else if (nameInput.value , mailInput.value , passwordInput.value , passConfirmInput.value , phoneInput01.value , phoneInput02.value , phoneInput03.value) {
        let timer = null;
        clearInterval(timer);
        setTime(179);
    }
}

function setTime (time) {
    const randNum = String( Math.floor( Math.random() * 1000000)).padStart(6, "0");
    authNum.innerText = randNum;

    clearInterval(timer);
    authTimer.innerText = "03:00";

    authNum.hidden = false;
    requestBtn.style = "background-color: #C7C7C7";
    authTimer.hidden = false;
    confirmBtn.style = "background-color: #491449";
    authTimer.style = "color: #E84F4F"

    nameInput.disabled = true;
    mailInput.disabled = true;
    passwordInput.disabled = true;
    passConfirmInput.disabled = true;
    phoneInput01.disabled = true;
    phoneInput02.disabled = true;
    phoneInput03.disabled = true;

    timer = setInterval( function() {
        const min = String( Math.floor( time / 60 ) ).padStart(2, "0");
        const sec = String( time % 60 ).padStart(2, "0");
        const remainTime = `${min}:${sec}`;

        if (time >= 0) {
            time -= 1
            authTimer.innerText = remainTime;
        } else {
            authNum.innerText = "000000"
        }
    }, 1000);
}

function confirm () {
    if (Number( authNum.innerText) > 0) {
        authNum.hidden = true;
        authTimer.hidden = true;
        confirmBtn.innerText = "인증완료";
        confirmBtn.style = "background-color: #C7C7C7";
        confirmBtn.style = "color: #491449"
    } else {
        return null;
    }
}

function signup () {
    if (introInput.value !== "" && radioMale.checked === true || radioFemale.checked === true && checkBox.checked === true) {
        const censoredPW = "*".repeat(String(passwordInput.value).length);
        const genderTest = radioMale.checked === true ? "남성" : "여성";
        const consoredPhone = "*".repeat(String(phoneInput02.value).length);

        let students = [];
        
        const tempStudent = [
            {
                name: nameInput.value,
                mail: mailInput.value,
                password: censoredPW,
                gender: genderTest,
                phone: phoneInput01.value + consoredPhone + phoneInput03.value,
                agree: "예",
                introduce: introInput.value,
                signupDate: `${year}-${month}-${date}`
            }
        ]

        alert(
`이름: ${tempStudent[0].name}
이메일: ${tempStudent[0].mail}
비밀번호: ${tempStudent[0].password}
성별: ${tempStudent[0].gender}
전화번호: ${tempStudent[0].phone}
동의여부: ${tempStudent[0].agree}
자기소개: ${tempStudent[0].introduce}
(가입일시: ${tempStudent[0].signupDate})`
        )

        students.push(tempStudent);
        localStorage.setItem("students", JSON.stringify(students));
    } else {
        alert("내용을 마저 채워 주세요!")
    }
}

signupBtn.addEventListener('click', guestSignup);
requestBtn.addEventListener('click', auth);
confirmBtn.addEventListener('click', confirm);
submitBtn.addEventListener('click', signup);