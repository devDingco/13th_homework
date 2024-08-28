function signup() {

    const joinus = document.getElementsByClassName("final_signup").value

    const todaydate = new Date()
    const announce = (todaydate.getFullYear() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getDate())

    alert(`회원가입을 축하합니다. (가입일시 : ${announce})`)
}


let 중복방지

function 인증번호요청기능() {
    clearInterval(중복방지)
    const 인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    
    document.getElementById("cert_number").innerText = 인증번호
    
    let 남은시간 = 179

    setInterval(function(){
        // setInterval : 시간 반복 함수

        const 분 = String(Math.floor(남은시간 / 60)).padStart(2, "0")
        const 초 = String(남은시간 % 60).padStart(2, "0")

        document.getElementById("남은시간보여주는곳").innerText = `${분}:${초}`

        남은시간 = 남은시간 - 1

    }, 1000)        
}


function 인증하기() {

    const stop = document.getElementsByClassName("cert2").value

   document.getElementById("남은시간보여주는곳").disabled = true   
//    document.getElementsByClassName("cert2").changed= document.getElementsByClassName("certfin")
}