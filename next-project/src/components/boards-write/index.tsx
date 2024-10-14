'use client';
import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { errors } from '../../../../.next/server/vendor-chunks/next';

const 나의그래프큐엘셋팅 = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

const UPDATE_BOARD = gql`
    mutation updateBoard(
        $updateBoardInput: UpdateBoardInput!
        $password: String
        $boardId: ID!
    ) {
        updateBoard(
            updateBoardInput: $updateBoardInput
            password: $password
            boardId: $boardId
        ) {
            _id
            writer
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

export default function BoardComponentWrite(props: any) {
    const router = useRouter();
    const params = useParams();

    const [writer, setwriter] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();

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
        setContents(event.target.value);
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
    const [updateBoard] = useMutation(UPDATE_BOARD);

    let onClickSubmit = async () => {
        try {
            const result = await 나의함수({
                variables: {
                    createBoardInput: {
                        writer: writer,
                        password: password,
                        title: title,
                        contents: contents,
                        youtubeUrl: '',
                        boardAddress: {
                            zipcode: '',
                            address: '',
                            addressDetail: '',
                        },
                        images: [''],
                    },
                },
            });
            console.log(result);

            if (
                writer !== '' &&
                password !== '' &&
                title !== '' &&
                contents !== ''
            ) {
                alert('회원가입을 축하드려요');
                router.push(`/boards/${result.data.createBoard._id}`);
            } else {
                alert('필수항목을 입력해 주세요');
            }
        } catch (error) {
            alert(error);
        }
    };

    const onClickUpdate = async () => {
        const 입력받은비밀번호 = prompt('작성하셨던 비밀번호를 입력하세요');

        const myvariables = {
            boardId: String(params.boardId),
            password: 입력받은비밀번호,
            updateBoardInput: {},
        };
        if (title) myvariables.updateBoardInput.title = title;
        if (contents) myvariables.updateBoardInput.contents = contents;

        try {
            const result = await updateBoard({
                variables: myvariables,
            });
            console.log(result);
            if (result.errors) throw new Error('사용자 비밀번호 입력값 불일치');
            alert('수정이 완료 되었습니다');
            router.push('/boards');
        } catch (error) {
            alert('비밀번호가 틀렸어요 ㅜㅜ');
            console.log('error');
        }
    };

    const onClickBack = () => {
        router.back();
    };

    return (
        <div className={styles.layout}>
            <div className={styles.regibox}>
                <div className={styles.regititle}>
                    게시물 {props.isEdit === true ? '수정' : '등록'}
                </div>
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
                        defaultValue={props.data?.fetchBoard.writer}
                        disabled={props.isEdit}
                    ></input>

                    <input
                        type="password"
                        placeholder="   비밀번호를 입력해 주세요"
                        className={styles.writerpasswordinput}
                        onChange={onChangePassword}
                        disabled={props.isEdit}
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
                        defaultValue={props.data?.fetchBoard.title}
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
                        defaultValue={props.data?.fetchBoard.contents}
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
                <button
                    className={styles.bottombuttoncancle}
                    onClick={onClickBack}
                >
                    취소
                </button>
                <button
                    className={styles.bottombuttonregi}
                    onClick={
                        props.isEdit === true ? onClickUpdate : onClickSubmit
                    }
                    style={{
                        backgroundColor:
                            isActive === true
                                ? 'blue'
                                : 'var(--gray-300, #c7c7c7)',
                    }}
                >
                    {props.isEdit === true ? '수정' : '등록'}하기
                </button>
            </div>
        </div>
    );
}
