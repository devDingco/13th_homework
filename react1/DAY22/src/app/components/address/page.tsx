"use client"

import styles from "@/app/pages/boards/new/BoardsNew.module.css";



const Address = (): JSX.Element => {
    
    return (
        <>
            <div className={styles.formContent}>
                <div className={styles.titleAdd}>주소</div>
                <div className={styles.addressSearch}>
                    <input type="number" id="number" className={styles.number} placeholder="01234" />
                    <button id="postCode" className={styles.postCode}>우편번호 검색</button>
                </div>
                <div className={styles.inputBox}>
                    <input id="addressInput" className={styles.addressInput} type="text" placeholder="주소를 입력해주세요" />
                    <input id="detailAddressInput"  className={styles.detailAddressInput} type="text" placeholder="상세주소" />
                </div>
            </div>
        </>
    )
};

export default Address;