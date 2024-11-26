'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Voucher() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.title}>숙박권 판매하기</div>

                    <div className={styles.titleBox}>
                        <div className={styles.titleBoxTitle}>
                            {' '}
                            상품명 <div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="상품명을 입력해 주세요."
                            className={styles.inputBox}
                        />
                    </div>
                    <div className={styles.titleBox}>
                        <div className={styles.titleBoxTitle}>
                            {' '}
                            한줄 요약 <div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="상품을 요약해 주세요."
                            className={styles.inputBox}
                        />
                    </div>

                    <div className={styles.titleBox}>
                        <div className={styles.titleBoxTitle}>
                            {' '}
                            한줄 요약 <div className={styles.star}>*</div>
                        </div>
                        <ReactQuill
                            theme="snow"
                            // onChange={onChangeContents}
                            // ref={quillRef}
                            className={styles.reactQuill}
                        />
                    </div>
                    <div className={styles.titleBox}>
                        <div className={styles.titleBoxTitle}>
                            {' '}
                            판매 가격 <div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="상품을 요약해 주세요."
                            className={styles.inputBox}
                        />
                    </div>
                    <div className={styles.titleBox}>
                        <div className={styles.titleBoxTitle}>
                            {' '}
                            태그 입력 <div className={styles.star}>*</div>
                        </div>
                        <input
                            type="text"
                            placeholder="상품을 요약해 주세요."
                            className={styles.inputBox}
                        />
                    </div>
                    <div className={styles.addressBox}>
                        <div className={styles.addressBoxLeft}>
                            <div className={styles.addressBoxLeftAddress}>
                                <div className={styles.titleBoxTitle}>
                                    {' '}
                                    주소 <div className={styles.star}>*</div>
                                </div>
                                <div className={styles.addressBoxLeftZipcode}>
                                    <div
                                        className={
                                            styles.addressBoxLeftZipcodeShow
                                        }
                                    >
                                        01234
                                    </div>
                                    <button
                                        className={
                                            styles.addressBoxLeftZipcodeBtn
                                        }
                                    >
                                        {' '}
                                        우편번호검색{' '}
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="상세주소를 입력해 주세요"
                                />
                            </div>

                            <div className={styles.addressBoxLeftZipcodeL}>
                                위도(LAT)
                                <input
                                    type="text"
                                    placeholder="주소를 먼저 입력해 주세요"
                                />
                                경도(LNG)
                                <input
                                    type="text"
                                    placeholder="주소를 먼저 입력해 주세요"
                                />
                            </div>
                        </div>

                        <div className={styles.addressBoxRight}>
                            <div>상세위치</div>
                            <div className={styles.mapImage}>
                                <div>주소를 먼저 입력해 주세요</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.imageBox}>
                        <div className={styles.imageBoxUpload}>
                            <div>사진첨부</div>
                            <Image
                                src="/images/add_image.jpg"
                                alt="add_image"
                                width={200}
                                height={200}
                            ></Image>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
