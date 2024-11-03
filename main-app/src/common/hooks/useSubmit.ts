import { ChangeEvent, MouseEvent, useState } from "react";
import { IBoardArgs, IBoardInput } from "../types/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CreateBoardDocument, FetchBoardsDocument } from "../graphql/graphql";
import withSweetAlert from "../library/withSweetAlert";

export default function useSubmitInput({ addressData, imageUrl }: IBoardArgs) {
    const { plainAlert, errorAlert } = withSweetAlert();

    const Router = useRouter();

    const [submitInput, setSubmitInput] = useState<IBoardInput>({
        author_ID: "",
        password_ID: "",
        title_ID: "",
        content_ID: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const submitInputFields = { ...submitInput };
        submitInputFields[e.target.id] = e.target.value;

        setSubmitInput(submitInputFields);
        console.log(submitInput);
    };

    const [createBoard] = useMutation(CreateBoardDocument);

    const onClickCreate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (submitInput.author_ID === "") return errorAlert("작성자를 확인해 주세요.");
        if (submitInput.password_ID === "") return errorAlert("비밀번호를 확인해 주세요.");
        if (submitInput.title_ID === "") return errorAlert("제목을 작성해 주세요.");
        if (submitInput.content_ID === "") return errorAlert("내용을 작성해 주세요.");

        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: submitInput.author_ID,
                        password: submitInput.password_ID,
                        title: submitInput.title_ID || "",
                        contents: submitInput.content_ID || "",
                        youtubeUrl: submitInput.link_ID,
                        boardAddress: {
                            zipcode: addressData?.zonecode,
                            address: addressData?.address,
                            addressDetail: submitInput.addressDetail_ID,
                        },
                        images: imageUrl,
                    },
                },
                refetchQueries: [
                    {
                        query: FetchBoardsDocument,
                        variables: { page: 1 },
                    },
                ],
            });
            Router.push(`/boards/${result.data?.createBoard._id}`);
            if (result) plainAlert(`등록되었습니다!!`, "success");
        } catch {
            errorAlert("등록에 실패하였습니다. 다시 시도해 주세요.");
        } finally {
            console.log("powered by graphql api");
        }
    };

    return {
        submitInput,
        handleChange,
        onClickCreate,
    };
}
