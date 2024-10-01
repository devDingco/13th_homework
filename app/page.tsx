'use client';
import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';

const 나의그래프큐엘셋팅 = gql`
    mutation createBoard(
        $mywriter: String
        $mytitle: String
        $mycontents: String
    ) {
        createBoard(writer: $mywriter, title: $mytitle, contents: $mycontents) {
            _id
            number
            message
        }
    }
`;

export default function App() {
    const [writer, setwriter] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setcontents] = useState('');

    const [writerError, setwriterError] = useState('');
    const [passwordError, setPassworError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentsError, setcontentsError] = useState('');

    let [isActive, setIsActive] = useState(false);

    let onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setwriter(event.target.value);
        if (event.target.value === '') {
            setwriterError('필수입력 사항 입니다');
        } else {
            setwriterError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (event.target.value === '') {
            setPassworError('필수입력 사항 입니다');
        } else {
            setPassworError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        console.log(event.target.value);
        if (event.target.value === '') {
            setTitleError('필수입력 사항 입니다');
        } else {
            setTitleError('');
        }

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            setIsActive(true);
        }
    };

    let onChangecontens = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setcontents(event.target.value);
        if (event.target.value === '') {
            setcontentsError('필수입력 사항 입니다');
        } else {
            setcontentsError('');
        }
        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== event.target.value
        ) {
            setIsActive(true);
        }
    };

    const [나의함수] = useMutation(나의그래프큐엘셋팅);

    // const 그래프큐엘저장하기 = async () => {
    //     const result = await 나의함수({
    //         variables: {
    //             mywriter: writer,
    //             mytile: title,
    //             mycontenss: contens,
    //         },
    //     });
    //     console.log(result);
    // };

    let onClickSignupSubmit = async () => {
        const result = await 나의함수({
            variables: {
                mywriter: writer,
                mytitle: title,
                mycontents: contents,
            },
        });

        if (
            writer !== '' &&
            password !== '' &&
            title !== '' &&
            contents !== ''
        ) {
            alert('회원가입을 축하드려요');
            console.log(result);
        } else {
            alert('필수항목을 입력해 주세요');
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.regibox}>
                <div className={styles.regititle}>게시물 등록</div>
                <div className={styles.writerpasswordtitle}>
                    <div>작성자</div>
                    {/* <div class="enroll-required-indicator"> *</div> */}
                    <div>비밀번호</div>
                    {/* <div class="enroll-required-indicator"> *</div> */}
                </div>
                <div className={styles.writerpasswordinputbox}>
                    <input
                        type="text"
                        placeholder="   작성자 명을 입력해 주세요"
                        className={styles.writerpasswordinput}
                        onChange={onChangeWriter}
                    ></input>

                    <input
                        type="password"
                        placeholder="   비밀번호를 입력해 주세요"
                        className={styles.writerpasswordinput}
                        onChange={onChangePassword}
                    ></input>
                </div>
                <div className={styles.requiedmention}>
                    <div>{writerError}</div>
                    <div>{passwordError}</div>
                </div>
                <hr />
                <div className={styles.titlebox}>
                    <div>제목</div>
                    <input
                        type="text"
                        placeholder="   제목을 입력해 주세요"
                        className={styles.titleinput}
                        onChange={onChangeTitle}
                    ></input>
                </div>

                <div className={styles.requiedmention}>
                    <div>{titleError}</div>
                </div>

                <hr />

                <div className={styles.contentsbox}>
                    <div>내용</div>
                    <textarea
                        placeholder="    &#13;&#10;   내용을 입력해 주세요"
                        className={styles.contentstextarea}
                        onChange={onChangecontens}
                    ></textarea>
                    <div className={styles.requiedmention}>
                        <div>{contentsError}</div>
                    </div>
                </div>
            </div>
            <div className={styles.addressbox}>
                <div>주소</div>
                <div className={styles.addressnumberbox}>
                    <input
                        type="text"
                        placeholder="213142"
                        className="address-number"
                    ></input>
                    <button className={styles.addressnumberbutton}>
                        우편번호 검색
                    </button>
                </div>

                <div className={styles.addressinputbox}>
                    <input
                        type="text"
                        placeholder="   주소를 입력해 주세요"
                        className={styles.addressinput}
                    ></input>
                    <input
                        type="text"
                        placeholder="   상세주소"
                        className={styles.addressdetailinput}
                    ></input>
                </div>
            </div>

            <div className={styles.youtubeBox}>
                <div>유튜브 링크</div>
                <input
                    placeholder="링크를 입력해 주세요"
                    className={styles.youtubeBoxinput}
                ></input>
            </div>

            <hr />

            <div className={styles.photoBox}>
                <div>사진첨부</div>
                <div className={styles.imagebox}>
                    <Image
                        src="/assets/add_image.jpg"
                        alt="add_image"
                        width={200}
                        height={200}
                    ></Image>
                    <Image
                        src="/assets/add_image.jpg"
                        alt="add_image"
                        width={200}
                        height={200}
                    ></Image>
                    <Image
                        src="/assets/add_image.jpg"
                        alt="add_image"
                        width={200}
                        height={200}
                    ></Image>
                </div>
            </div>
            <div className={styles.bottombuttonbox}>
                <button className={styles.bottombuttoncancle}>취소</button>
                <button
                    className={styles.bottombuttonregi}
                    onClick={onClickSignupSubmit}
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
}
