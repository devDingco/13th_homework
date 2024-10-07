"use client";

export default function ImgField() {
    return (
        <aside>
            <div className="field__attach">
                <p>사진 첨부</p>

                <div className="attach__img">
                    <figure>
                        <img src="/svg/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>

                    <figure>
                        <img src="/svg/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>

                    <figure>
                        <img src="/svg/add.svg" alt="click to upload img" />
                        <figcaption>클릭하여 사진 업로드</figcaption>
                    </figure>
                </div>
            </div>
        </aside>
    );
}
