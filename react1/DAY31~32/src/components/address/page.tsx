import { ChangeEvent, useEffect } from 'react';
import usePostCode from '../daumPostcode/hook';
import styles from '@/components/boardsWrite/styles.module.css';
import { Modal } from 'antd';
import { useAppContext } from '@/contexts/AppContext';
import { Tooltip } from '@mui/material';
import Image from 'next/image';

const Address = () => {
    const appContext = useAppContext();

    const { postCode, handlePostCodeSearch, isVisible, setIsVisible } =
        usePostCode();

    const address = appContext.boardAddress?.address || '';
    const zipcode = appContext.boardAddress?.zipcode || '';

    useEffect(() => {
        if (postCode) {
            appContext.setBoardAddress((prev) => ({
                ...prev,
                zipcode: postCode,
            }));
        }
    }, [postCode]);

    const handleBoardAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newAddress = event.target.value;
        appContext.setBoardAddress({
            ...appContext.boardAddress,
            address: newAddress,
        });
    };

    const handleDetailAddressChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const newDetailAddress = event.target.value;
        appContext.setBoardAddress({
            ...appContext.boardAddress,
            addressDetail: newDetailAddress,
        });
    };

    return (
        <>
            <div className={styles.formContent}>
                <div className={styles.titleAdd}>주소</div>
                <div className={styles.addressSearch}>
                    <input
                        type="text"
                        id="number"
                        className={styles.number}
                        placeholder="01234"
                        value={appContext.boardAddress?.zipcode || ''}
                        readOnly
                    />
                    <button
                        type="button"
                        id="postCode"
                        className={styles.postCode}
                        onClick={handlePostCodeSearch}
                    >
                        <Modal
                            title="우편번호 검색"
                            open={isVisible}
                            onCancel={() => {
                                setIsVisible(false);
                            }}
                            footer={null}
                        >
                            <Tooltip title={`${zipcode} ${address}`} arrow>
                                <Image
                                    src="/images/mapIcon.png"
                                    alt="위치"
                                    className={styles.mapIcon}
                                    width={24}
                                    height={24}
                                />
                            </Tooltip>
                            <button onClick={handlePostCodeSearch}>검색</button>
                        </Modal>
                        우편번호 검색
                    </button>
                </div>
                <div className={styles.inputBox}>
                    <input
                        id="addressInput"
                        className={styles.addressInput}
                        type="text"
                        placeholder="주소를 입력해주세요"
                        value={appContext.boardAddress?.address || ''}
                        onChange={handleBoardAddressChange}
                    />
                    <input
                        id="detailAddressInput"
                        className={styles.detailAddressInput}
                        type="text"
                        placeholder="상세주소"
                        value={appContext.boardAddress?.addressDetail || ''}
                        onChange={handleDetailAddressChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Address;
