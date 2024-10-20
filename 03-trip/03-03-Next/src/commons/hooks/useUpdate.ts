import { useQuery, useMutation } from "@apollo/client";
import { FetchBoardDocument, UpdateBoardDocument } from "../graphql/graphql";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function useUpdate({ addressData }) {
    const Params = useParams();
    const Router = useRouter();

    const { data } = useQuery(FetchBoardDocument, {
        variables: { boardId: Params.boardId },
    });

    // interface IUpdateInput {
    //     title_ID: string;
    //     content_ID: string;
    //     link_ID: string;
    // }

    // interface IUpdateAdd {
    //     zipcode_ID: string;
    //     address00_ID: string;
    //     address01_ID: string;
    // }

    const [updateInput, setUpdateInput] = useState({});

    // useEffect(() => {
    //     setUpdateInput((prev) => ({
    //         ...prev,
    //         zipcode_ID: addressData?.zonecode,
    //         address00_ID: addressData?.address,
    //     }));
    // }, [addressData]);

    useEffect(() => {
        setUpdateInput({
            title_ID: data?.fetchBoard.title,
            content_ID: data?.fetchBoard.contents,
            zipcode_ID: data?.fetchBoard.boardAddress?.zipcode,
            address00_ID: data?.fetchBoard.boardAddress?.address,
        });
    }, [data]);

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
            boardId: Params.boardId,
            password: password,
            updateBoardInput: {
                title: updateInput.title_ID,
                contents: updateInput.content_ID,
                youtubeUrl: updateInput.link_ID,
                boardAddress: {
                    zipcode: updateInput.zipcode_ID,
                    address: updateInput.address00_ID,
                    addressDetail: updateInput.address01_ID,
                },
            },
        };
        console.log(updateData);

        try {
            const result = await updateBoard({
                variables: updateData,
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
