'use client';

import Image from 'next/image';
import rightArrow from '/public/svg/right_arrow.svg';

import styles from './styles.module.css';
import { useRef, useState } from 'react';
import { checkValidtionFile } from '@/commons/libraries/validation';
import Footer from '../../../commons/layout/header/footer';
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Link from 'next/link';

export default function NewPage() {
    // 주소 모달
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState('');

    const showModal = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        setIsOpen(false);
        window.history.pushState(null, '', `/?address=${address}`); // !!!얘가 샬로우라우팅 핵심!!!
    };
    const handleCancel = () => {
        setIsOpen(false);
    };
    const handleComplete = (data: any) => {
        setAddress(data.address);
        console.log(address);

        // setZoncode(data.zonecode);
        // setIsOpen(false); // 모달종료
    };

    const [images, setImages] = useState([]);
    const fileRef = useRef(); // fileRef는 레퍼런스. 어떤 태그에 등록해 놓으면 변수로 컨트롤 할 수 있음
    const [placeName, setPlaceName] = useState(''); // 플레이스 이름 상태
    const [placeContents, setPlaceContents] = useState(''); // 플레이스 내용 상태
    const isButtonEnabled = placeName.length > 0 && placeContents.length > 0; // 버튼 활성화 조건

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
                        onChange={(e) => setPlaceName(e.target.value)} // 입력값을 상태에 저장
                    />
                </div>
                <div className={styles.placeAddressBox}>
                    <div
                        className={styles.placeAddressBoxInput}
                        onClick={showModal}
                    >
                        <Link href={'/solplace-logs/new/map'}>
                            플레이스 주소 입력
                        </Link>
                        <Image src={rightArrow} alt="rightarrow" />
                    </div>
                    {isOpen && (
                        <Modal
                            title="지도페이지로 이동합니당"
                            open={true}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <DaumPostcodeEmbed
                                onComplete={handleComplete}
                                autoClose={true}
                                // onresize //open()함수를 이용한 팝업모드에서는 지원하지 않음
                            />
                        </Modal>
                    )}
                </div>
                <div className={styles.placeContentsBox}>
                    <div className={styles.placeNameBoxTitle}>
                        플레이스 내용 <div className={styles.star}>*</div>
                    </div>
                    <textarea
                        name="플레이스내용"
                        placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
                        className={styles.textarea}
                        onChange={(e) => setPlaceContents(e.target.value)} // 입력값을 상태에 저장
                    ></textarea>
                </div>
                <Footer isFixed={false}>
                    <div className={styles.logBtnBox}>
                        <button
                            disabled={!isButtonEnabled} // 버튼 비활성화
                            className={styles.logBtnBoxLogBtn}
                            style={{
                                backgroundColor: isButtonEnabled
                                    ? '#2974E5'
                                    : '#d4d3d3', // 버튼 색상 변경
                                color: isButtonEnabled ? '#fff' : '#e4e4e4',
                                cursor: isButtonEnabled
                                    ? 'pointer'
                                    : 'not-allowed',
                            }}
                        >
                            로그 등록
                        </button>
                    </div>
                </Footer>
            </div>
        </div>
    );
}
