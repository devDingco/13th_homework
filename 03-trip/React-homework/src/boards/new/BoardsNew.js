import React from "react"
import { useState } from "react"


// 인풋 컴포넌트 공용, 필수입력 검증
const InputField = (props) => {

    return (
        <fieldset className={props.fieldClass}>
            <label htmlFor={props.labelID}>{props.innerText}</label>
            <b>{props.required ? "*" : ""}</b>
            {!props.textArea ? (
                <input
                    id={props.labelID}
                    type={props.type}
                    placeholder={props.placeHolder}
                    onChange={props.onChange}
                />
            ) : (   
                <textarea
                    id={props.labelID}
                    placeholder={props.placeHolder}
                    onChange={props.onChange}
                />
            )}
            <b>
                {props.value || !props.required ? <br /> : "필수입력 사항 입니다."}
            </b>
        </fieldset>
    )
}

// 하드코딩된 필드 - 주소
const AddressField = () => {
    return (
        <fieldset className="field__address">
            <label>주소</label>

            <div className="address__zipcode">
                <input className="zipcode__input" type="tel" placeholder="01234" maxLength="5"/>
                <button className="zipcode__btn">우편번호<br />검색</button>
            </div>

            <input type="text" placeholder="주소를 입력해 주세요." />
            <input type="text" placeholder="상세주소" />
        </fieldset>
    )
}

// 하드코딩된 필드 - 이미지
const ImgField = () => {
    return (
        <aside>
            <div className="field__attach">
                <p>사진 첨부</p>

                <div className="attach__img">
                    <figure>
                        <img src="/asset/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>

                    <figure>
                        <img src="/asset/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>

                    <figure>
                        <img src="/asset/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>
                </div>
            </div>
        </aside>
    )
}

// 버튼 컴포넌트 - 당장에는 딱히 큰 도움 안되지만 아무튼 컴포넌트
const Btn = ({className, value, disabled, onClick}) => {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>{value}</button>
    )
}

// 메인 필드
const Main = () => {
    const [author, setAuthor] = useState()
    const [password, setPassword] = useState()
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const valid = author && password && title && content

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value

        setAuthor(id === "author__ID" ? value : "")
        setPassword(id === "password__ID" ? value : "")
        setTitle(id === "title__ID" ? value : "")
        setContent(id === "content__ID" ? value : "")
        console.log( author, password, title, content )
    }

    const handleClick = (event) => {
        event.preventDefault()
        console.log(author, password, title, content)
        alert(`${author}, ${password}, ${title}, ${content}`)
    }

    return <>
        <header>게시물 등록</header>
        <form>
            <InputField
                fieldClass="field__author"
                labelID="author__ID"
                type="text"
                innerText="작성자"
                placeHolder="작성자 명을 입력해 주세요."
                onChange={handleChange}
                value={author}
                required
            />
            <InputField
                fieldClass="field__password"
                labelID="password__ID"
                type="password"
                innerText="비밀번호"
                placeHolder="비밀번호를 입력해 주세요."
                onChange={handleChange}
                value={password}
                required
            />
            <hr />
            <InputField
                fieldClass="field__title"
                labelID="title__ID"
                type="text"
                innerText="제목"
                placeHolder="제목을 입력해 주세요."
                onChange={handleChange}
                value={title}
                required
            />
            <hr />
            <InputField
                fieldClass="field__content"
                labelID="content__ID"
                type="text"
                innerText="내용"
                placeHolder="내용을 입력해 주세요."
                textArea="textArea"
                onChange={handleChange}
                value={content}
                required
            />
            <hr />
            <AddressField />
            <hr />
            <InputField
                fieldClass="field__link"
                labelID="link__ID"
                type="text"
                innerText="소셜 링크"
                placeHolder="링크를 입력해 주세요."
            />
            <hr />
            <ImgField />

            <div className="field__btn">
                <Btn
                    className="btn__cancel"
                    value="취소"
                    disabled={!valid}
                />
                <Btn
                    className="btn__submit"
                    value="등록하기"
                    disabled={!valid}
                    onClick={handleClick}
                />
            </div>
        </form>
    </>
}

// Main comp goes to App.js
export default Main