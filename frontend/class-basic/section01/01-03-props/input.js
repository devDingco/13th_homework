const 영희의인풋 = (훈이의props) => {

    console.log(훈이의props.나는누구게)
    console.log(훈이의props)
    console.log(훈이의props.철수가방)
    console.log(훈이의props.영희가방)

    const 나만의초기메세지 = "비밀번호를 입력하세요"
    
    //바벨이 변수까지 합쳐서 jsx -> html로 바꿔줌
    return (
     <input type="text" placeholder={나만의초기메세지}/>
    )
}