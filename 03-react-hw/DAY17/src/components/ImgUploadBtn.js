import React, { useState } from "react";

const ImgUploadBtn = () => {
  const [previewSrc, setPreviewSrc] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="사진업로드상자">
      {!previewSrc ? (
        <>
          <img src="/images/icons/add.svg" width="40" height="40" alt="Add" />
          <span>클릭해서 사진 업로드</span>
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </>
      ) : (
        <img src={previewSrc} alt="미리보기" className="사진미리보기" />
      )}
    </div>
  );
};

export default ImgUploadBtn;
