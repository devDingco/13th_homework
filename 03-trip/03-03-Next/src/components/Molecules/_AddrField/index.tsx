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
        data,
        isEdit,
    } = props;

    return (
        <>
            <label>
                주소
                <div style={SearchBarStyle}>
                    <Input
                        id="zipcode_ID"
                        onClick={onToggleModal}
                        value={
                            isEdit && addressData.zonecode === undefined
                                ? data?.fetchBoard.boardAddress?.zipcode
                                : addressData?.zonecode
                        }
                        disabled={isModalOpen}
                    />
                    <Button onClick={onToggleModal}>주소 검색</Button>
                </div>
                <Input
                    id="address00_ID"
                    onClick={onToggleModal}
                    value={
                        isEdit && addressData.address === undefined
                            ? data?.fetchBoard.boardAddress?.address
                            : addressData?.address
                    }
                    disabled={isModalOpen}
                />
                <Input
                    id="address01_ID"
                    onChange={onChange}
                    value={
                        isEdit && addressData.addressDetail === undefined
                            ? data?.fetchBoard.boardAddress?.addressDetail
                            : ""
                    }
                />
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
