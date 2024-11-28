const 영희의인풋 = () => {

    const 나만의초기메세지 = "비밀번호를 입력하세요"
    
    //바벨이 변수까지 합쳐서 jsx -> html로 바꿔줌
    return (
     <input type="text" placeholder={나만의초기메세지}/>
    )
}