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
            {/* <div className="imgBox">
                <div className="imgBoxTitle">사진첨부</div>
                <div className="cardBox">
                <div className="imgCard">
                <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                <div className="imgCard">
                <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                <div className="imgCard">
                        <img type="file" accept="image/*" src={uploadImg} onChange={onChangeImg} alt="이미지" /></div>
                        </div>
                </div> */}
                <div className="imgBox">
                <div className="imgBoxTitle">사진첨부</div>
                <div className="cardBox">
    <div className="imgCard">
        <div className="uploadText">+</div>
        <div className="uploadText">클릭해서 사진업로드</div>
    </div>
    <div className="imgCard">
        <div className="uploadText">+</div>
        <div className="uploadText">클릭해서 사진업로드</div>
    </div>
    <div className="imgCard">
        <div className="uploadText">+</div>
        <div className="uploadText">클릭해서 사진업로드</div>
                    </div>
                    </div>
</div>

        </>
    )
};

export default ImgUpload;