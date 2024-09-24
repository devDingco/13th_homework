import './App.css';
import React from 'react';
import { useState } from 'react';

import add from './assets/add_image.jpg';

const App = () => {
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [authorError, setAuthorError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    let [isActive, setIsActive] = useState(false);

    // const [isActive, setIsActive] = useState(false);

    let onChangeWriter = (event) => {
        setAuthor(event.target.value);
        if (event.target.value === '') {
            setAuthorError('필수입력 사항 입니다');
        } else {
            setAuthorError('');
        }

        if (
            author !== '' &&
            password !== '' &&
            title !== '' &&
            content !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangePassword = (event) => {
        setPassword(event.target.value);
        if (event.target.value === '') {
            setPassworError('필수입력 사항 입니다');
        } else {
            setPassworError('');
        }

        if (
            author !== '' &&
            password !== '' &&
            title !== '' &&
            content !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangeTitle = (event) => {
        setTitle(event.target.value);
        if (event.target.value === '') {
            setTitleError('필수입력 사항 입니다');
        } else {
            setTitleError('');
        }

        if (
            author !== '' &&
            password !== '' &&
            title !== '' &&
            content !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangeContent = (event) => {
        setContent(event.target.value);
        if (event.target.value === '') {
            setContentError('필수입력 사항 입니다');
        } else {
            setContentError('');
        }
        if (
            author !== '' &&
            password !== '' &&
            title !== '' &&
            content !== event.target.value
        ) {
            setIsActive(true);
        }
    };

    let onClickSignup = (event) => {
        if (
            author !== '' &&
            password !== '' &&
            title !== '' &&
            content !== ''
        ) {
            alert('회원가입을 축하드려요');
        } else {
            alert('필수항목을 입력해 주세요');
        }
    };

    return (
        <div className="layout">
            <div className="regi-box">
                <div className="regi-title">게시물 등록</div>
                <div className="writer-password-title">
                    <div>작성자</div>
                    {/* <div class="enroll-required-indicator"> *</div> */}
                    <div>비밀번호</div>
                    {/* <div class="enroll-required-indicator"> *</div> */}
                </div>
                <div className="writer-password-input-box">
                    <input
                        text="text"
                        placeholder="   작성자 명을 입력해 주세요"
                        className="writer-password-input"
                        onChange={onChangeWriter}
                    ></input>

                    <input
                        text="password"
                        placeholder="   비밀번호를 입력해 주세요"
                        className="writer-password-input"
                        onChange={onChangePassword}
                    ></input>
                </div>
                <div className="requied-mention">
                    <div>{authorError}</div>
                    <div>{passwordError}</div>
                </div>
                <hr />
                <div className="title-box">
                    <div>제목</div>
                    <input
                        type="text"
                        placeholder="   제목을 입력해 주세요"
                        className="title-input"
                        onChange={onChangeTitle}
                    ></input>
                </div>

                <div className="requied-mention">
                    <div>{titleError}</div>
                </div>

                <hr />

                <div className="content-box">
                    <div>내용</div>
                    <textarea
                        type="text"
                        placeholder="    &#13;&#10;   내용을 입력해 주세요"
                        className="content-textarea"
                        onChange={onChangeContent}
                    ></textarea>
                    <div className="requied-mention">
                        <div>{contentError}</div>
                    </div>
                </div>
            </div>
            <div className="address-box">
                <div>주소</div>
                <div className="address-number-box">
                    <input
                        type="text"
                        placeholder="213142"
                        className="address-number"
                    ></input>
                    <button className="address-number-button">
                        우편번호 검색
                    </button>
                </div>

                <div className="address-input-box">
                    <input
                        type="text"
                        placeholder="   주소를 입력해 주세요"
                        className="address-input"
                    ></input>
                    <input
                        type="text"
                        placeholder="   상세주소"
                        className="address-detail-input"
                    ></input>
                </div>
            </div>

            <div className="youtubeBox">
                <div>유튜브 링크</div>
                <input
                    placeholder="링크를 입력해 주세요"
                    className="youtubeBox-input"
                ></input>
            </div>

            <hr />

            <div className="photoBox">
                <div>사진첨부</div>
                <img src={add} alt="add_image"></img>
                <img src={add} alt="add_image"></img>
                <img src={add} alt="add_image"></img>
            </div>
            <div className="bottom-button-box">
                <button className="bottom-button-cancle">취소</button>
                <button
                    className="bottom-button-regi"
                    onClick={onClickSignup}
                    style={{
                        backgroundColor:
                            isActive === true
                                ? 'blue'
                                : 'var(--gray-300, #c7c7c7)',
                    }}
                >
                    등록하기
                </button>
            </div>
        </div>
    );
};

export default App;
