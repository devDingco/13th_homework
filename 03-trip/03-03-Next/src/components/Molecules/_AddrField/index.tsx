"use client";

import Input from "@/components/Atoms/_Input";
import { Button, Modal } from "antd";

import DaumPostcodeEmbed from "react-daum-postcode";

const SearchBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "180px",
};

export default function AddressFieldUI({ ...props }) {
    const {
        onChange,
        isModalOpen,
        addressData,
        onToggleModal,
        handleComplete,
    } = props;
    return (
        <>
            <label>
                주소
                <div style={SearchBarStyle}>
                    <Input
                        id="zipcode_ID"
                        onClick={onToggleModal}
                        value={addressData?.zonecode}
                        disabled={isModalOpen}
                    />
                    <Button onClick={onToggleModal}>주소 검색</Button>
                </div>
                <Input
                    id="address01_ID"
                    onClick={onToggleModal}
                    value={addressData?.address}
                    disabled={isModalOpen}
                />
                <Input id="address02_ID" onChange={onChange} />
                {/* modal */}
                {isModalOpen && (
                    <Modal
                        open={true}
                        onOk={onToggleModal}
                        onCancel={onToggleModal}
                    >
                        <div>우편번호 검색</div>
                        <DaumPostcodeEmbed onComplete={handleComplete} />
                    </Modal>
                )}
            </label>
        </>
    );
}
