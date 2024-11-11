"use client";

import { css } from "@/common/styled-system/css";
import Input from "@/components/Atoms/_Input";
/**
 * @TODO 모달 하나 때문에 antd 써야 하는건지.. 더 생각해보자
 */
import { Button, Modal } from "antd";

import DaumPostcodeEmbed from "react-daum-postcode";

export default function AddressFieldUI({ ...props }) {
    const { onChange, isModalOpen, addressData, onToggleModal, handleComplete, data, isEdit } =
        props;

    return (
        <>
            <label>
                주소
                <div className={CSS_Zipcode}>
                    <Input
                        id="zipcode_ID"
                        onClick={onToggleModal}
                        value={
                            isEdit && addressData === undefined
                                ? data?.fetchBoard.boardAddress?.zipcode
                                : addressData?.zonecode
                        }
                        disabled={isModalOpen}
                    />
                    <Button onClick={onToggleModal}>주소 검색</Button>
                </div>
                <Input
                    id="address_ID"
                    onClick={onToggleModal}
                    value={
                        isEdit && addressData === undefined
                            ? data?.fetchBoard.boardAddress?.address
                            : addressData?.address
                    }
                    disabled={isModalOpen}
                />
                <Input
                    id="addressDetail_ID"
                    onChange={onChange}
                    value={
                        isEdit && addressData === undefined
                            ? data?.fetchBoard.boardAddress?.addressDetail
                            : ""
                    }
                />
                {/* modal */}
                {isModalOpen && (
                    <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
                        <div>우편번호 검색</div>
                        <DaumPostcodeEmbed onComplete={handleComplete} />
                    </Modal>
                )}
            </label>
        </>
    );
}

const CSS_Zipcode = css({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "180px",
});
