"use client";

import useDaumPostApi from "@/common/hooks/useDaumPostApi";
import useSubmit from "@/common/hooks/useSubmit";
import useUploadImg from "@/common/hooks/useUploadImg";

import Button from "@/components/Atoms/_Button";
import AddressField from "@/components/Molecules/_AddrField";
import ImgField from "@/components/Molecules/_ImgField";
import InputField from "@/components/Molecules/_InputField";
import { useRouter } from "next/navigation";

export default function BoardsNewUI() {
    const router = useRouter();

    const { isModalOpen, addressData, onToggleModal, handleComplete } = useDaumPostApi();

    const { imageUrl, onChangeFile } = useUploadImg();

    const { submitInput, handleChange, onClickCreate } = useSubmit({
        addressData,
        imageUrl,
    });

    const valid =
        submitInput.author_ID &&
        submitInput.password_ID &&
        submitInput.title_ID &&
        submitInput.content_ID;

    return (
        <section>
            <header>게시글 작성</header>

            <div>
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
            </div>
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

            <div>
                <Button label="취소하기" onClick={() => router.push(`/boards`)} />
                <Button label="등록하기" disabled={!valid} onClick={onClickCreate} />
            </div>
        </section>
    );
}
