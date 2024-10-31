import { ChangeEvent, useState } from "react";
import { IBoardArgs, IBoardInput } from "../types/types";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { FetchBoardDocument, UpdateBoardDocument } from "../graphql/graphql";
import withSweetAlert from "../library/withSweetAlert";

export default function useUpdate({ addressData, imageUrl }: IBoardArgs) {
    const { plainAlert, errorAlert } = withSweetAlert();

    const Params = useParams();
    const Router = useRouter();

    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: Params.boardId as string },
    });

    const [updateInput, setUpdateInput] = useState<IBoardInput>({});

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setUpdateInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
        console.log(updateInput);
    }

    const [updateBoard] = useMutation(UpdateBoardDocument);

    async function handleUpdate() {
        const password = prompt("비밀번호를 입력해주세요");

        const updateData = {
            title: updateInput.title_ID || data?.fetchBoard.title,
            contents: updateInput.content_ID || data?.fetchBoard.contents,
            youtubeUrl: updateInput.link_ID || data?.fetchBoard.youtubeUrl,
            boardAddress: {
                zipcode:
                    addressData?.zonecode ||
                    data?.fetchBoard.boardAddress?.zipcode,
                address:
                    addressData?.address ||
                    data?.fetchBoard.boardAddress?.address,
                addressDetail:
                    updateInput.address01_ID ||
                    data?.fetchBoard.boardAddress?.addressDetail,
            },
            images: imageUrl,
        };
        console.log(updateData);

        try {
            const result = await updateBoard({
                variables: {
                    boardId: Params.boardId as string,
                    password: password,
                    updateBoardInput: updateData,
                },
            });
            console.log(result);

            plainAlert("수정이 완료 되었습니다!", "success");
            Router.push(`/boards/${Params.boardId}`);
        } catch (err) {
            console.log(err);
            errorAlert("비밀번호를 확인해주세요");
        }
    }

    return { handleChange, handleUpdate, data };
}
