'use client';

import React from 'react';

import styles from './styles.module.css';

import Address from '@/components/address/page';
import Button from '@/components/button/page';
import HrLine from '@/components/hrLine/page';
import ImgUpload from '@/components/imageUpload/page';
import Youtube from '@/components/youtube/page';
import { useBoardsNew } from './hook';
import { IBoardsNewProps } from '@/app/types/IBoardsNewProps';

export default function BoardsNewUI({
    isEdit,
    data,
    showResetButton = true,
}: IBoardsNewProps) {
    const {
        writer,
        password,
        title,
        contents,
        handleInputChange,
        handleVideoSelect,
        handleUpdate,
        handleSubmit,
        resetForm,
        errorAlert,
        isActive,
        loading,
    } = useBoardsNew({ isEdit, data });

    if (loading) return <p>Loading....</p>;

    return (
        <>
            <div className={styles.container}>
                <h2>{isEdit ? 'Edit Board' : 'Create New Board'}</h2>
                {errorAlert && <p style={{ color: 'red' }}>{errorAlert}</p>}
                <div style={{ border: 'none' }}>
                    <fieldset style={{ border: 'none' }}>
                        <legend className={styles.legend}>게시물 등록</legend>
                        <div className={styles.formControl}>
                            <form className={styles.firstLine}>
                                <label htmlFor="writer">작성자</label>
                                <input
                                    type="text"
                                    id="writer"
                                    className={styles.writer}
                                    value={writer}
                                    onChange={handleInputChange('writer')}
                                    placeholder="작성자명을 입력해주세요"
                                />
                            </form>
                            <form className={styles.firstLine}>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    id="password"
                                    type="password"
                                    className={styles.password}
                                    value={password}
                                    onChange={handleInputChange('password')}
                                    placeholder="비밀번호를 입력해주세요"
                                    autoComplete="new-password"
                                />
                            </form>
                        </div>
                        <HrLine />
                        <form className={styles.formContent}>
                            <label htmlFor="title">제목</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                className={styles.title}
                                onChange={handleInputChange('title')}
                                placeholder="제목을 입력해주세요"
                                autoComplete="new-password"
                            />
                        </form>
                        <HrLine />

                        <form className={styles.formContent}>
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                className={styles.content}
                                value={contents}
                                onChange={handleInputChange('contents')}
                                placeholder="내용을 입력해주세요"
                            ></textarea>
                        </form>
                    </fieldset>
                </div>
                <Address />
                <HrLine />
                <Youtube onVideoSelect={handleVideoSelect} videoId={''} />
                <HrLine />
                <ImgUpload />
                <Button
                    onSubmit={isEdit ? handleUpdate : handleSubmit}
                    onReset={resetForm}
                    isDisabled={loading || !isActive}
                    isEdit={isEdit}
                    showResetButton={showResetButton}
                    style={{
                        backgroundColor: isActive ? '#2974E5' : '#CCCCCC',
                    }}
                />
            </div>
        </>
    );
}
