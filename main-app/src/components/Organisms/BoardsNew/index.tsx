"use client";

import useDaumPostApi from "@/common/hooks/useDaumPostApi";
import useUploadImg from "@/common/hooks/useUploadImg";
import { css } from "@/common/styled-system/css";
import { Button_Radii_Primary, Button_Radii_White } from "@/components/Atoms/_Button/button";
import AddressField from "@/components/Molecules/_AddrField";
import ImgField from "@/components/Molecules/_ImgField";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { I_schema, newPostSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/Molecules/_InputField/field";
import useSubmitInput from "./useSubmit";

export default function BoardsNewUI() {
    const router = useRouter();

    const { isModalOpen, addressData, onToggleModal, handleComplete } = useDaumPostApi();

    const { imageUrl, onChangeFile } = useUploadImg();

    const { handleChange, onClickCreate } = useSubmitInput({
        addressData,
        imageUrl,
    });

    // const valid = submitInput.author_ID && submitInput.password_ID && submitInput.title_ID && submitInput.content_ID;

    const methods = useForm<I_schema>({
        resolver: zodResolver(newPostSchema),
        mode: "onChange",
    });

    // function onClickNewPost(data: I_schema) {
    //     console.log(data);
    // }

    return (
        <section>
            <header>게시글 작성</header>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onClickCreate)}>
                    <div className={css_userWrap}>
                        <InputField<I_schema> keyname="writer" size={css.raw({ width: "47rem" })} required />
                        <InputField<I_schema> keyname="password" size={css.raw({ width: "47rem" })} required />
                    </div>
                    <InputField<I_schema> keyname="title" required />
                    <InputField<I_schema> keyname="contents" required textarea />

                    <AddressField
                        onChange={handleChange}
                        isModalOpen={isModalOpen}
                        addressData={addressData}
                        onToggleModal={onToggleModal}
                        handleComplete={handleComplete}
                    />

                    <InputField<I_schema> keyname="link" />

                    <ImgField imageUrl={imageUrl} onChange={onChangeFile} />

                    <div className={css_buttonWrap}>
                        <Button_Radii_Primary label="등록하기" />
                        <Button_Radii_White label="취소하기" type="button" onClick={() => router.push(`/boards`)} />
                    </div>
                </form>
            </FormProvider>
        </section>
    );
}

const css_userWrap = css({
    display: "flex",
    gap: "2rem",
    justifyContent: "space-between",
});

const css_buttonWrap = css({
    display: "flex",
    gap: "2rem",
    justifyContent: "flex-end",
});

{
    /* <div className={css({ display: "flex" })}>
    <InputField id="author_ID" value={submitInput.author_ID} onChange={handleChange} required />
    <InputField id="password_ID" value={submitInput.password_ID} onChange={handleChange} required />
</div>
<InputField id="title_ID" value={submitInput.title_ID} onChange={handleChange} required />
<InputField id="content_ID" value={submitInput.content_ID} onChange={handleChange} required textarea />

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
</div> */
}
