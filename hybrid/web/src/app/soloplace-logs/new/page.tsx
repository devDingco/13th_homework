'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useRef, useState } from 'react';
import { checkValidtionFile } from '@/commons/libraries/validation';

export default function NewPage() {
    const [images, setImages] = useState([]);
    const fileRef = useRef(); // fileRef는 레퍼런스. 어떤 태그에 등록해 놓으면 변수로 컨트롤 할 수 있음

    const onChangeFile = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        const updatedImages = [...images, ...newImageUrls];
        setImages(updatedImages);
        sessionStorage.setItem('images', JSON.stringify(updatedImages));

        const isValid = checkValidtionFile(files);
        if (!isValid) return;
    };

    const onClickImage = () => {
        fileRef.current.click();
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.imageBox}>
                    <div className={styles.imageBoxLeft}>
                        <Image
                            src="/images/add.png"
                            alt="add"
                            width={100}
                            height={100}
                            layout="fixed"
                            style={{
                                cursor: 'pointer',
                                marginRight: '.75rem',
                            }}
                            onClick={onClickImage}
                        />
                        <input
                            type="file"
                            onChange={onChangeFile}
                            style={{ display: 'none' }}
                            ref={fileRef}
                        />
                    </div>

                    <div className={styles.showImage}>
                        {images.map((image, index) => (
                            <div className={styles.mapImageBox}>
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    style={{
                                        width: '6.25rem',
                                        height: '6.25rem',
                                        borderRadius: '.5rem',
                                    }}
                                />
                                <button
                                    className={styles.cancleBtn}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.placeNameBox}>
                    <div className={styles.placeNameBoxTitle}>
                        플레이스 이름 <div className={styles.star}>*</div>
                    </div>
                    <input
                        type="text"
                        placeholder="플레이스 이름을 입력해주세요. (1자 이상)"
                    />
                </div>
                <div className={styles.placeAddressBox}>
                    <div>플레이스 주소</div>
                    <button>
                        <div>플레이스 주소 입력</div>
                        <div>{`>`}</div>
                    </button>
                </div>
                <div className={styles.placeContentsBox}>
                    <div className={styles.placeNameBoxTitle}>
                        플레이스 내용 <div className={styles.star}>*</div>
                    </div>
                    <textarea
                        name="플레이스내용"
                        placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
                        className={styles.textarea}
                    ></textarea>
                </div>
                <div className={styles.logBtnBox}>
                    <button>로그 등록</button>
                </div>
            </div>
        </div>
    );
}
