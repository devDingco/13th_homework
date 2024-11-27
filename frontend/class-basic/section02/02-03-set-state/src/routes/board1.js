import React, { useState, useEffect } from 'react';

const Board = () => {
    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [isActive, setIsActive] = useState(false)

    // useEffect(() => {
    //     checkActive();
    // }, [writer, title, content])

    // const checkActive = () => {
    //     if (writer !== "" && title !== "" && content !== "") {
    //         setIsActive(true)
    //     } else {
    //         setIsActive(false)
    //     }
    // };

    const onChangeWriter = (event) => {
        setWriter(event.target.value);
        if(event.target.value !== "" && title !== "" && content !== "") {
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    };

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        if(writer !== "" && event.target.value !== "" && content !== "") {
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    };

    const onChangeContent = (event) => {
        setContent(event.target.value);
        if(writer !== "" && title !== "" && event.target.value !== "") {
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    };

    const onClickSubmit = () => {
        console.log(writer);
        console.log(title);
        console.log(content);
        alert("게시글 등록에 성공하였습니다.");
    };

    return (
        <>
            작성자: <input type="text" onChange={onChangeWriter} /> <br />
            제목: <input type="text" onChange={onChangeTitle} /> <br />
            내용: <input type="text" onChange={onChangeContent} /> <br />
            <button
                onClick={onClickSubmit}
                style={{ backgroundColor: isActive ? "yellow" : "gray" }}
                disabled={!isActive}
            >
                등록하기
            </button>
        </>
    );
};

export default Board;
