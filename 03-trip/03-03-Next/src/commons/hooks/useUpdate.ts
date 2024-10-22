import { useQuery, useMutation } from "@apollo/client";
import { FetchBoardDocument, UpdateBoardDocument } from "../graphql/graphql";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useUpdate({ addressData, imageUrl }) {
    const Params = useParams();
    const Router = useRouter();

    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: Params.boardId },
    });

    const [updateInput, setUpdateInput] = useState({});

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
                    boardId: Params.boardId,
                    password: password,
                    updateBoardInput: updateData,
                },
            });
            console.log(result);

            alert("수정이 완료 되었습니다!");
            Router.push(`/boards/${Params.boardId}`);
        } catch (err) {
            console.log(err);
            alert("비밀번호를 확인해주세요");
        }
    }

    return { handleChange, handleUpdate, data };
}
