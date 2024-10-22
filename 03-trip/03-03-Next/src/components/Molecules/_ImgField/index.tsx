"use client";

import ImgUploader from "../ImgUploader";

const ImgUploaderStyle = {
    display: "flex",
    gap: "2rem",
};

export default function ImgField({ imageUrl, onChange }) {
    return (
        <>
            <label>사진 첨부</label>
            <div style={ImgUploaderStyle}>
                {imageUrl.map((el, idx) => (
                    <ImgUploader
                        key={idx}
                        idx={idx}
                        imageUrl={el}
                        onChange={onChange}
                    />
                ))}
            </div>
        </>
    );
}
