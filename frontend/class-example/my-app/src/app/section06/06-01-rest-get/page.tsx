'use client'

export default function RestGetPage () {

    const onClickAsync = () => {
        const result = fetch("https://koreanjson.com/posts/1")
        console.log(result) //Promise
    }

    const onClickSync = async() => {
        const result = await fetch("https://koreanjson.com/posts/1")
        const data =  await result.json()
        console.log(data) //제대로된 결과 => {title... }
        console.log(data.title) 
    }

    return (
        <>
            <button onClick={onClickAsync}>REST API 비동기 요청하기</button>
            <button onClick={onClickSync}>RESU API 동기 요청하기</button>
        </>

    )
}