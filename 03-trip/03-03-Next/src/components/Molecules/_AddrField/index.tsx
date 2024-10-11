"use client";

import Input from "@/components/Atoms/_Input";

import DaumPostcodeEmbed from "react-daum-postcode";
import { Button, Modal } from "antd";
import { useState } from "react";

export default function AddressFieldUI({ onChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    let result = {};
    const handleComplete = (data) => {
        console.log(data);
        result = { ...data };
        onToggleModal(); // true to false
    };

    console.log(result);

    return (
        <>
            <label>
                주소
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Input
                        id="zipcode_ID"
                        onChange={onChange}
                        // value={data?.zonecode}
                        disabled
                    />
                    <Button onClick={onToggleModal}>주소 검색</Button>
                </div>
                <Input
                    id="address01_ID"
                    onChange={onChange}
                    // value={data?.address}
                    disabled
                />
                <Input id="address02_ID" onChange={onChange} />
                {isModalOpen && (
                    <Modal
                        open={true}
                        onOk={onToggleModal}
                        onCancel={onToggleModal}
                    >
                        <div>우편번호 놓기</div>
                        <DaumPostcodeEmbed onComplete={handleComplete} />
                    </Modal>
                )}
            </label>
        </>
    );
}

{
    /*
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
*/
}
