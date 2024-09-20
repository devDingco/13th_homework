const 영희의인풋 = () => {
    
    const 나만의초기메시지 = "비밀번호를 입력하세요."

    // 어차피 바벨이 진짜HTML로 바꿔줌
    return <input type="text" placeholder={나만의초기메시지}></input>
}