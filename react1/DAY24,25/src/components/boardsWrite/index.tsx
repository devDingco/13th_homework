'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOARD } from '@/app/graphql/createBoard';
import { FETCH_BOARD } from '@/app/graphql/fetchBoard';
import { UPDATE_BOARD } from '@/app/graphql/updateBoard';
import { ApolloError } from '@apollo/client';

import React from 'react';

import styles from './BoardsNew.module.css';

import Address from '@/components/address/page';
import Button from '@/components/button/page';
import HrLine from '@/components/hrLine/page';
import ImgUpload from '@/components/imageUpload/page';
import YoutubeLink from '@/components/youtube/page';

const BoardsNew = ({
    isEdit,
    data,
}: {
    isEdit: boolean;
    data: any;
}): JSX.Element => {
    const router = useRouter();
    const params = useParams();

    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState(isEdit ? data.title : '');
    const [content, setContent] = useState(isEdit ? data.content : '');
    const [errorAlert, setErrorAlert] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const [updateBoard] = useMutation(UPDATE_BOARD);
    const [createBoard] = useMutation(CREATE_BOARD);

    const { data: fetchedData } = useQuery(FETCH_BOARD, {
        variables: { boardId: params.boardId },
        skip: !isEdit,
    });

    console.log(data);

    useEffect(() => {
        if (isEdit && fetchedData) {
            setWriter(fetchedData.fetchBoard.writer || '');
            setTitle(fetchedData.fetchBoard.title || '');
            setContent(fetchedData.fetchBoard.contents || '');
            setPassword('');
        }
    }, [fetchedData, isEdit]);

    const handleValidation = (): boolean => {
        if (!writer || !password || !title || !content) {
            setErrorAlert('필수등록 사항 입니다');
            setIsActive(false);
            return false;
        }
        setErrorAlert('');
        setIsActive(true);
        return true;
    };

    const handleSubmit = async (): Promise<void> => {
        if (handleValidation()) {
            try {
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer: writer,
                            title: title,
                            password: password,
                            contents: content,
                        },
                    },
                });
                console.log(result);
                router.push(`/pages/boards/${result.data.createBoard._id}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdate = async () => {
        if (handleValidation()) {
            try {
                const inputPassword = prompt('비밀번호를 입력하십쇼');
                if (!inputPassword) {
                    setErrorAlert('비밀번호는 필수입니다');
                    return;
                }
                const result = await updateBoard({
                    variables: {
                        updateBoardInput: {
                            writer,
                            title,
                            contents: content,
                        },
                        password: inputPassword,
                        boardId: params.boardId,
                    },
                });
                console.log(result);
                router.push(`/boards/${params.boardId}`);
            } catch (error) {
                if (error instanceof ApolloError) {
                    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                        const errorMessage = error.graphQLErrors.map(
                            (err) => err.message
                        );
                        setErrorAlert(errorMessage.join(', '));
                    } else {
                        setErrorAlert('그래프큐엘과 맞지 않아요');
                    }
                    console.error(error);
                    setErrorAlert('오류가 발생했어요');
                }
            }
        }
    };

    const handleReset = (): void => {
        setWriter('');
        setPassword('');
        setTitle('');
        setContent('');
        setIsActive(false);
    };

    const handleName = (e: ChangeEvent<HTMLInputElement>): void => {
        setWriter(e.target.value);
        handleValidation();
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        handleValidation();
    };

    const handleTitle = (e: ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
        handleValidation();
    };

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
        handleValidation();
    };

    return (
        <>
            <div className={styles.container}>
                <form style={{ border: 'none' }}>
                    <fieldset style={{ border: 'none' }}>
                        <legend className={styles.legend}>게시물 등록</legend>
                        <div className={styles.formControl}>
                            <div className={styles.firstLine}>
                                <label htmlFor="writer">작성자</label>
                                <input
                                    type="text"
                                    id="writer"
                                    className={styles.writer}
                                    value={writer}
                                    onChange={handleName}
                                    placeholder="작성자명을 입력해주세요"
                                />
                                {data?.fetchBoard.writer && (
                                    <span>{data.fetchBoard.writer}</span>
                                )}
                            </div>
                            <div className={styles.firstLine}>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={styles.password}
                                    value={password}
                                    onChange={handlePassword}
                                    placeholder="비밀번호를 입력해주세요"
                                />
                            </div>
                        </div>
                        <HrLine />
                        <div className={styles.formContent}>
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                className={styles.title}
                                onChange={handleTitle}
                                placeholder="제목을 입력해주세요"
                            />
                            {data?.fetchBoard.title && (
                                <span>{data.fetchBoard.title}</span>
                            )}
                        </div>
                        <HrLine />

                        <div className={styles.formContent}>
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                className={styles.content}
                                value={content}
                                onChange={handleContent}
                                placeholder="내용을 입력해주세요"
                            ></textarea>
                            {data?.fetchBoard.contents && (
                                <span>{data.fetchBoard.contents}</span>
                            )}
                        </div>
                        {errorAlert && (
                            <div id="errorAlert" style={{ color: 'red' }}>
                                {errorAlert}
                            </div>
                        )}
                    </fieldset>
                </form>
                <Address />
                <HrLine />
                <YoutubeLink />
                <HrLine />
                <ImgUpload />
                <Button
                    onSubmit={isEdit ? handleUpdate : handleSubmit}
                    onReset={handleReset}
                    isDisabled={!isActive}
                    style={{
                        backgroundColor: isActive ? '#2974E5' : '#CCCCCC',
                    }}
                    isEdit={isEdit}
                />
            </div>
        </>
    );
};

export default BoardsNew;
