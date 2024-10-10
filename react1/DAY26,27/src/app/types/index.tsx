'use client';

import React from 'react';

import styles from './styles.module.css';

import Address from '@/components/address/page';
import Button from '@/components/button/page';
import HrLine from '@/components/hrLine/page';
import ImgUpload from '@/components/imageUpload/page';
import YoutubeLink from '@/components/youtube/page';
import { useBoardsNew } from '@/components/boardsWrite/hook';
import { IBoardsNewProps } from '@/app/types/IBoardsNewProps';

const BoardsNewUI: React.FC<IBoardsNewProps> = (props) => {
    const {
        writer,
        password,
        title,
        content,
        handleName,
        handlePassword,
        handleTitle,
        handleContent,
        handleUpdate,
        handleSubmit,
        handleReset,
        errorAlert,
        isActive,
        loading,
    } = useBoardsNew(props);

    if (loading) return <p>Loading....</p>;

    return (
        <>
            <div className={styles.container}>
                <h2>{props.isEdit ? 'Edit Board' : 'Create New Board'}</h2>
                {errorAlert && <p style={{ color: 'red' }}>{errorAlert}</p>}
                <form style={{ border: 'none' }}>
                    <fieldset style={{ border: 'none' }}>
                        <legend className={styles.legend}>게시물 등록</legend>
                        <div className={styles.formControl}>
                            <div className={styles.firstLine}>
                                <label htmlFor="writer">작성자</label>
                                <input
                                    type="text"
                                    className={styles.writer}
                                    value={writer}
                                    onChange={handleName}
                                    placeholder="작성자명을 입력해주세요"
                                />
                            </div>
                            <div className={styles.firstLine}>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
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
                                value={title}
                                className={styles.title}
                                onChange={handleTitle}
                                placeholder="제목을 입력해주세요"
                            />
                        </div>
                        <HrLine />

                        <div className={styles.formContent}>
                            <label htmlFor="content">내용</label>
                            <textarea
                                className={styles.content}
                                value={content}
                                onChange={handleContent}
                                placeholder="내용을 입력해주세요"
                            ></textarea>
                        </div>
                    </fieldset>
                </form>
                <Address />
                <HrLine />
                <YoutubeLink />
                <HrLine />
                <ImgUpload />
                <Button
                    onSubmit={props.isEdit ? handleUpdate : handleSubmit}
                    onReset={handleReset}
                    isDisabled={!isActive}
                    isEdit={props.isEdit}
                    style={{
                        backgroundColor: isActive ? '#2974E5' : '#CCCCCC',
                    }}
                />
            </div>
        </>
    );
};

export default BoardsNewUI;
