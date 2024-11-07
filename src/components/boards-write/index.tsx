'use client';
import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useBoardWrite } from './hook';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';
import { FETCH_BOARD } from './queries';

export default function BoardComponentWrite(props: any) {
    const {
        imageUrl,
        setImageUrl,
        fileRef,
        onChangeFile,
        onClickImage,
        onClickDeleteImage,
        isHovered,
        setIsHovered,
        detailAddress,
        setDetailAddress,
        zonecode,
        setZoncode,
        address,
        setAddress,
        isOpen,
        writerError,
        passwordError,
        titleError,
        contentsError,
        isActive,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        onChangeWriter,
        onChangeTitle,
        onChangePassword,
        onChangeContents,
        onChangeYouTubeUrl,
        onChangeDetailAddress,
        onClickSubmit,
        onClickUpdate,
        onClickBack,
        setIsOpen,
    } = useBoardWrite();

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
                        id="writer"
                        type="text"
                        placeholder="작성자 명을 입력해 주세요"
                        className={styles.writerpasswordinput}
                        onChange={onChangeWriter}
                        defaultValue={props.data?.fetchBoard.writer}
                        disabled={props.isEdit}
                    ></input>

                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
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
                        id="title"
                        type="text"
                        placeholder="제목을 입력해 주세요"
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
                        id="contents"
                        placeholder="내용을 입력해 주세요"
                        className={styles.contentstextarea}
                        onChange={onChangeContents}
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
                        placeholder=" "
                        value={zonecode}
                        className="address-number"
                    ></input>
                    <button
                        className={styles.addressnumberbutton}
                        onClick={showModal}
                    >
                        우편번호 검색
                    </button>
                    {isOpen && (
                        <Modal
                            title="주소 검색"
                            open={true}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <DaumPostcodeEmbed onComplete={handleComplete} />
                        </Modal>
                    )}
                </div>

                <div className={styles.addressinputbox}>
                    <input
                        type="text"
                        placeholder="주소를 입력해 주세요"
                        className={styles.addressinput}
                        value={address}
                    ></input>

                    <input
                        type="text"
                        placeholder="상세주소"
                        className={styles.addressdetailinput}
                        onChange={onChangeDetailAddress}
                    ></input>
                </div>
            </div>

            <div className={styles.youtubeBox}>
                <div>유튜브 링크</div>
                <input
                    defaultValue={props.data?.fetchBoard.youtubeUrl}
                    id="youtube"
                    placeholder="링크를 입력해 주세요"
                    className={styles.youtubeBoxinput}
                    onChange={onChangeYouTubeUrl}
                ></input>
            </div>

            <hr />

            <div className={styles.photoBox}>
                <div>사진첨부</div>
                <div className={styles.imagebox}>
                    <Image
                        src="/images/add_image.jpg"
                        alt="add_image"
                        width={200}
                        height={200}
                        onClick={onClickImage}
                    ></Image>

                    {props.data?.fetchBoard.images ? (
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                            onMouseEnter={() => setIsHovered(true)} // 마우스 오버 시
                            onMouseLeave={() => setIsHovered(false)} // 마우스 아웃 시
                        >
                            <img
                                src={`https://storage.googleapis.com/${props.data?.fetchBoard.images}`}
                                style={{ width: '200px', height: '200px' }}
                            />
                            {isHovered && ( // 호버 상태일 때만 버튼 표시
                                <button
                                    onClick={onClickDeleteImage}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ) : (
                        <Image
                            src="/images/add_image.jpg"
                            alt="add_image"
                            width={200}
                            height={200}
                            onClick={onClickImage}
                        ></Image>
                    )}

                    {imageUrl ? (
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                            onMouseEnter={() => setIsHovered(true)} // 마우스 오버 시
                            onMouseLeave={() => setIsHovered(false)} // 마우스 아웃 시
                        >
                            <img
                                src={`https://storage.googleapis.com/${imageUrl}`}
                                style={{ width: '200px', height: '200px' }}
                            />
                            {isHovered && ( // 호버 상태일 때만 버튼 표시
                                <button
                                    onClick={onClickDeleteImage}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ) : (
                        <Image
                            src="/images/add_image.jpg"
                            alt="add_image"
                            width={200}
                            height={200}
                            onClick={onClickImage}
                        ></Image>
                    )}
                    {/* {props.data?.fetchBoard ? (
                        <img
                            src={`https://storage.googleapis.com/${props.data?.fetchBoard.images}`}
                            style={{ width: '200px', height: '200px' }}
                        />
                    ) : (
                        <div>이미지 없을 때</div>
                    )} */}
                </div>
                <input
                    type="file"
                    onChange={onChangeFile}
                    style={{ display: 'none' }}
                    ref={fileRef}
                />
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
