"use client";

import Input from "@/components/Atoms/_Input";
import { Button, Modal } from "antd";

import DaumPostcodeEmbed from "react-daum-postcode";
import useDaumPostApi from "@/commons/hooks/useDaumPostApi";

const SearchBarStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "180px",
};

export default function AddressFieldUI({
    onChange,
}: {
    onChange: React.ChangeEventHandler;
}) {
    const { isModalOpen, addrData, onToggleModal, handleComplete } =
        useDaumPostApi();

    return (
        <>
            <label>
                주소
                <div style={SearchBarStyle}>
                    <Input
                        id="zipcode_ID"
                        onClick={onToggleModal}
                        value={addrData?.zonecode}
                        disabled={addrData ? true : false}
                    />
                    <Button onClick={onToggleModal}>주소 검색</Button>
                </div>
                <Input
                    id="address01_ID"
                    onClick={onToggleModal}
                    value={addrData?.address}
                    disabled={addrData ? true : false}
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
