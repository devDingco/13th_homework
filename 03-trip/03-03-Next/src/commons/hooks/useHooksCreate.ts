"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { CreteBoardDocument } from "../graphql/graphql";
import { IHooksCreateProps } from "../types/types";

export default function useHooksCreate(props: IHooksCreateProps) {
    const { author, password, title, content } = props;

    const [createBoard] = useMutation(CreteBoardDocument);
    const Router = useRouter();

    const onClickCreate = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        if (author === "") return alert("작성자를 확인해 주세요.");
        if (password === "") return alert("비밀번호를 확인해 주세요.");
        if (title === "") return alert("제목을 작성해 주세요.");
        if (content === "") return alert("내용을 작성해 주세요.");

        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        writer: author,
                        password: password,
                        title: title,
                        contents: content,
                    },
                },
            });
            Router.push(`/boards/${result.data?.createBoard._id}`);
            if (result) alert(`등록되었습니다!!`);
        } catch {
            alert("등록에 실패하였습니다. 다시 시도해 주세요.");
        } finally {
            console.log("powered by graphql api");
        }
    };

    return onClickCreate;
}
