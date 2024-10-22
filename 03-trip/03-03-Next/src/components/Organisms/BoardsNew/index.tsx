"use client";

import useDaumPostApi from "@/commons/hooks/useDaumPostApi";
import useSubmitInput from "@/commons/hooks/useSubmitInput";
import useUploadImg from "@/commons/hooks/useUploadImg";

import Button from "@/components/Atoms/_Button";
import AddressField from "@/components/Molecules/_AddrField";
import ImgField from "@/components/Molecules/_ImgField";
import InputField from "@/components/Molecules/_InputField";

export default function BoardsNewUI() {
    const { isModalOpen, addressData, onToggleModal, handleComplete } =
        useDaumPostApi();

    const { imageUrl, onChangeFile } = useUploadImg();

    const { submitInput, handleChange, onClickCreate } = useSubmitInput({
        addressData,
        imageUrl,
    });

    const valid =
        submitInput.author_ID &&
        submitInput.password_ID &&
        submitInput.title_ID &&
        submitInput.content_ID;

    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100rem",
            }}
        >
            <header>게시글 작성</header>

            <InputField
                id="author_ID"
                value={submitInput.author_ID}
                onChange={handleChange}
                required
            />
            <InputField
                id="password_ID"
                value={submitInput.password_ID}
                onChange={handleChange}
                required
            />
            <InputField
                id="title_ID"
                value={submitInput.title_ID}
                onChange={handleChange}
                required
            />
            <InputField
                id="content_ID"
                value={submitInput.content_ID}
                onChange={handleChange}
                required
                textarea
            />

            <AddressField
                onChange={handleChange}
                isModalOpen={isModalOpen}
                addressData={addressData}
                onToggleModal={onToggleModal}
                handleComplete={handleComplete}
            />

            <InputField id="link_ID" onChange={handleChange} />

            <ImgField imageUrl={imageUrl} onChange={onChangeFile} />

            <Button
                label="등록하기"
                disabled={!valid}
                onClick={onClickCreate}
            />
        </section>
    );
}
