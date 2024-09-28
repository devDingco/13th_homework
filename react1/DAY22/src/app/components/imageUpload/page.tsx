"use client";

// import { IImgUploadStyles } from "@/types/IImgUploadStyles";
import styles from "@/app/pages/boards/new/BoardsNew.module.css";




const ImgUpload = () => {
    // const [uploadImg, setUploadImg] = React.useState('');

    // const onChangeImg = (e) => {
    //     const {files} = e.target
    //     const uploadFile = files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(uploadFile);
    //     reader.onloadend = () => {
    //         setUploadImg(reader.result);
    //     }
    // }

    return (
        <>
            {/* <div className={styles.imgBox">
                <div className={styles.imgBoxTitle">사진첨부</div>
                <div className={styles.cardBox">
                <div className={sty}>
                <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                <div className={sty}>
                <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                <div className={sty}>
                        <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                        </div>
                </div> */}
            <div className={styles.imgBox}>
                <div className={styles.imgBoxTitle}>사진첨부</div>
                <div className={styles.cardBox}>
    <div className={styles.imgCard}>
        <div className={styles.uploadText}>+</div>
        <div className={styles.uploadText}>클릭해서 사진업로드</div>
    </div>
    <div className={styles.imgCard}>
        <div className={styles.uploadText}>+</div>
        <div className={styles.uploadText}>클릭해서 사진업로드</div>
    </div>
    <div className={styles.imgCard}>
        <div className={styles.uploadText}>+</div>
        <div className={styles.uploadText}>클릭해서 사진업로드</div>
                    </div>
                    </div>
</div>

        </>
    )
};

export default ImgUpload;