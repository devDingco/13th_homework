import { useQuery, useMutation } from "@apollo/client";
import { FetchBoardDocument, UpdateBoardDocument } from "../graphql/graphql";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useUpdate() {
    const Params = useParams();
    const Router = useRouter();

    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: Params.boardId },
    });

    const [title, setTitle] = useState(data?.fetchBoard.title);
    const [contents, setContents] = useState(data?.fetchBoard.contents);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case "title": {
                setTitle(value);
                break;
            }
            case "contents": {
                setContents(value);
                break;
            }
        }
    }

    const [updateBoard] = useMutation(UpdateBoardDocument);

    async function handleUpdate() {
        const password = prompt("비밀번호를 입력해주세요");

        const updateData = {
            boardId: Params.boardId,
            password: password,
            updateBoardInput: { title, contents },
        };

        try {
            const result = await updateBoard({
                variables: updateData,
            });
            console.log(result);

            alert("수정이 완료 되었습니다!");
            Router.push(`/boards/${Params.boardId}`);
        } catch (error) {
            alert("비밀번호를 확인해주세요");
        }
    }

    return { handleChange, handleUpdate, data };
}
