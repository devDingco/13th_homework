"use client";

import { ChangeEvent, useState } from "react";
import { checkImgFile } from "../utils/checkImgFile";
import { useMutation } from "@apollo/client";
import { UploadFileDocument } from "../graphql/graphql";

export default function useUploadImg() {
    const [imageUrl, setImageUrl] = useState(["", "", ""]);
    const [uploadFile] = useMutation(UploadFileDocument);

    const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const file = e.target.files?.[0];
        console.log(file);

        const isValid = checkImgFile(file);
        if (!isValid) return;

        if (imageUrl.length > 3) {
            alert("최대 3개의 이미지만 업로드 가능합니다.");
            return;
        }

        try {
            const result = await uploadFile({ variables: { file } });
            setImageUrl((prev) => {
                const newImageUrl = [...prev];
                newImageUrl[id] = result.data?.uploadFile.url ?? "";
                return newImageUrl;
            });
        } catch (error) {
            alert("이미지 등록에 실패하였습니다!!");
            console.log(error);
        }
    };

    return {
        imageUrl,
        onChangeFile,
    };
}
