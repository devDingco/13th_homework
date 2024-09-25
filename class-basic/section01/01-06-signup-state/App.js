
const App = () => {

    const [email, setEmail] = React.useState("")
    const [password , setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")

    //이벤트 핸들러 함수 (handleChnageEmail - 형태로 만드는 회사도 많음)
    const onChangeEmail = (event) => {
        console.log(event.target) //작동된 태그
        console.log(event.target.value) //작동된 태그에 입력된 값

        setEmail(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickSignup = () => {
        console.log(email) // state에 저장이 잘 됐는지 확인 
        console.log(password)

        if(email.includes("@") === false) {
            // alert("이메일 형식이 올바르지 않습니다.")
            // document.getElementById("이메일에러표시하는곳").innerText= "이메일 형식이 올바르지 않습니다."

            //state로 에러 보여주기
            setEmailError("이메일 형식이 올바르지 않습니다.")
        } else {
            alert("회원가입을 축하합니다.")
        }
    }
   
    
    return (
        <div className="철수의App">
            이메일: <input type="text" onChange={onChangeEmail}/> <br/>
            {/* <div id="이메일에러표시하는곳"></div> */}
            <div>{emailError}</div>
            비밀번호: <input type="password" onChange={onChangePassword}/> <br/>
            <button onClick={onClickSignup}>회원가입</button>
        </div>
    )
}