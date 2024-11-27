import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import withSweetAlert from "@/common/library/withSweetAlert";
import { IBoardArgs } from "@/common/types/types";
import { CreateBoardDocument, FetchBoardsDocument } from "@/common/graphql/graphql";

export default function useSubmitInput({ addressData, imageUrl }: IBoardArgs) {
    const { plainAlert, errorAlert } = withSweetAlert();

    const Router = useRouter();

    const [submitInput, setSubmitInput] = useState({
        writer: "",
        password: "",
        title: "",
        contents: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const submitInputFields = { ...submitInput };
        submitInputFields[e.target.id] = e.target.value;

        setSubmitInput(submitInputFields);
        console.log(submitInput);
    };

    const [createBoard] = useMutation(CreateBoardDocument);

    const onClickCreate = async (data) => {
        const newPostInput = { ...submitInput, ...data };

        newPostInput.link = newPostInput.link.split("=")[1];
        newPostInput.zonecode = addressData?.zonecode;
        newPostInput.address = addressData?.address;
        newPostInput.images = imageUrl;

        console.log(newPostInput);

        // if (submitInput.author_ID === "") return errorAlert("작성자를 확인해 주세요.");
        // if (submitInput.password_ID === "") return errorAlert("비밀번호를 확인해 주세요.");
        // if (submitInput.title_ID === "") return errorAlert("제목을 작성해 주세요.");
        // if (submitInput.content_ID === "") return errorAlert("내용을 작성해 주세요.");

        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: newPostInput.writer,
                        password: newPostInput.password,
                        title: newPostInput.title || "",
                        contents: newPostInput.contents || "",
                        youtubeUrl: newPostInput.link,
                        boardAddress: {
                            zipcode: newPostInput?.zonecode,
                            address: newPostInput?.address,
                            addressDetail: newPostInput.addressDetail_ID,
                        },
                        images: newPostInput.images,
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
        }
        // finally {
        //     console.log("powered by graphql api");
        // }
    };

    return {
        handleChange,
        onClickCreate,
    };
}
