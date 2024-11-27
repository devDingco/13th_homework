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
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages(imageUrls);

        const isValid = checkValidtionFile(files);
        if (!isValid) return;
    };

    const onClickImage = () => {
        fileRef.current.click();
    };

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                <div className={styles.titleBox}>{`< 플레이스 등록`}</div>
                <div className={styles.imageBox}>
                    <Image
                        src="/images/add.png"
                        alt="add"
                        width={100}
                        height={100}
                        style={{ cursor: 'pointer' }}
                        onClick={onClickImage}
                    />
                    <input
                        type="file"
                        onChange={onChangeFile}
                        style={{ display: 'none' }}
                        ref={fileRef}
                        multiple
                    />
                    <div className={styles.showImage}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Uploaded ${index}`}
                            />
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
