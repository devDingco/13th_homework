"use client";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";
import { Modal, Button, Input } from "antd";

export default function ModalAddressPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState({ address: "", zonecode: "" });

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  interface IOnComplete {
    address: string;
    zonecode: string;
  }
  const onComplete = (data: IOnComplete) => {
    setIsOpen(false);
    console.log(data);
    setAddress({ address: data.address, zonecode: data.zonecode });
  };

  return (
    <div className="flex flex-col gap-3 w-[30%] m-10">
      <div className="flex gap-3">
        <Input size="large" value={address.zonecode} placeholder="우편번호" />
        <Button
          onClick={handleToggle}
          color="default"
          variant="solid"
          size="large"
        >
          우편번호 검색
        </Button>
      </div>
      <Input size="large" value={address.address} placeholder="주소" />

      {/* 모달 종료 방식 1 : 모달을 숨기는 형태 */}
      {/* <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="주소 검색"
      >
        <DaumPostcodeEmbed onComplete={onComplete} />
      </Modal> */}

      {/* 모달 종료 방식 2 : 모달을 새로 보이는 형태 */}
      {isOpen && (
        <Modal open={true} onOk={handleToggle} onCancel={handleToggle}>
          <DaumPostcodeEmbed onComplete={onComplete} />
        </Modal>
      )}
    </div>
  );
}
