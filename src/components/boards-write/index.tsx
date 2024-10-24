'use client';
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useBoardWrite } from './hook';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd';

export default function BoardComponentWrite(props: any) {
    const {
        detailAddress,
        setDetailAddress,
        zonecode,
        setZoncode,
        address,
        setAddress,
        showModal,
        handleOk,
        handleCancel,
        handleComplete,
        onChangeDetailAddress,
        onChangeWriter,
        onChangePassword,
        onChangeTitle,
        onChangecontens,
        onClickSubmit,
        onClickUpdate,
        onClickBack,
        isOpen,
        setIsOpen,
        writerError,
        passwordError,
        titleError,
        contentsError,
        isActive,
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
                        type="text"
                        placeholder="작성자 명을 입력해 주세요"
                        className={styles.writerpasswordinput}
                        onChange={onChangeWriter}
                        defaultValue={props.data?.fetchBoard.writer}
                        disabled={props.isEdit}
                    ></input>

                    <input
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
                        placeholder="내용을 입력해 주세요"
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
                    placeholder="링크를 입력해 주세요"
                    className={styles.youtubeBoxinput}
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
                    ></Image>
                    <Image
                        src="/images/add_image.jpg"
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
