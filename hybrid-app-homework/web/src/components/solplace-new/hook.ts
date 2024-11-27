"use client";

import { ChangeEvent, useState } from "react";
import { Address } from "react-daum-postcode";

export const useSolNewPage = () => {
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [zipcode, setZipcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length <= 100) {
      setInputValue(value);
    }

    if (name.trim() && inputValue.trim()) {
      setIsActive(true);
    }
  };

  const onClickAdress = () => {
    setIsOpen((prev) => !prev);
  };

  const postcodeComplete = (data: Address) => {
    setZipcode();
    setBasicAddress();
    onClickAdress();
  };

  const onClickRegist = () => {};

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (imageUrl.length < 10) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImageUrl((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("최대 10개의 사진만 등록할 수 있습니다."); // 제한 경고 메시지
      }
    }
  };

  const onClickRemovePrevImg = (index: number) => {
    setImageUrl((prev) => prev.filter((_, idx) => idx !== index));
  };

  return {
    onChangeName,
    onChangeContents,
    onClickRegist,
    onClickAdress,
    postcodeComplete,
    onChangeFile,
    onClickRemovePrevImg,
    inputValue,
    imageUrl,
    isActive,
    isOpen,
  };
};
