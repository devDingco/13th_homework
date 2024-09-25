
const 카운터 = () => {

    const [count, setCount] = React.useState(0)

    const 카운트올리는기능 = () => {
        setCount(count + 1)
    }
    const 카운트내리는기능 = () => {
        setCount(count - 1)
    }

    //함수의 리턴은 한개만 할 수 있음. 따라서 하나로 묶어줌 빈<>로 묶던지 <div>로 묶던지...
    return (
        <div>
            <div>{count}</div>
            <button onClick={카운트올리는기능}>카운트 올리기</button>
            <button onClick={카운트내리는기능}>카운트 내리기</button>
        </div>
    )
}