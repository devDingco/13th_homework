"use client";

// 하드코딩된 필드 - 주소
export default function AddressField() {
    return (
        <fieldset className="field__address">
            <label>주소</label>

            <div className="address__zipcode">
                <input
                    className="zipcode__input"
                    type="tel"
                    placeholder="01234"
                    maxLength={5}
                />
                <button className="zipcode__btn">우편번호 검색</button>
            </div>

            <input type="text" placeholder="주소를 입력해 주세요." />
            <input type="text" placeholder="상세주소" />
        </fieldset>
    );
}
