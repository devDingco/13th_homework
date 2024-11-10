"use client";

import { Rate } from "antd";
import Input from "@/components/Atoms/_Input";

import Image from "next/image";
import profile from "/public/svg/person.svg";
import edit from "/public/svg/edit.svg";
import close from "/public/svg/close.svg";
import check from "/public/svg/check.svg";

import { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { UpdateBoardCommentDocument } from "@/common/graphql/graphql";
import { css } from "@/common/styled-system/css";
import withSweetAlert from "@/common/library/withSweetAlert";

export default function CommentUI({ el }) {
    const { errorAlert } = withSweetAlert();

    const [isEdit, setIsEdit] = useState(false);
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);
    const [password, setPassword] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        switch (e.target.id) {
            case "comment_ID": {
                setComment(e.target.value);
                console.log(comment);
                break;
            }
            case "password_ID": {
                setPassword(e.target.value);
                console.log(password);
                break;
            }
        }
    }

    const [updateComment] = useMutation(UpdateBoardCommentDocument);

    async function handleUpdate() {
        try {
            const result = await updateComment({
                variables: {
                    boardCommentId: el._id,
                    password: password,
                    updateBoardCommentInput: {
                        contents: comment,
                        rating: stars,
                    },
                },
            });
            console.log(result);
            setIsEdit(!isEdit);
        } catch (error) {
            console.log(error);
            errorAlert("댓글 수정에 실패하였습니다!");
        }
    }

    return (
        <>
            <div className={CSS_CommentHead}>
                <div className={CSS_CommentWrap}>
                    <Image src={profile} alt="profile" />
                    <div>{el.writer}</div>
                    {isEdit ? (
                        <Rate value={stars} onChange={setStars} allowHalf />
                    ) : (
                        <Rate value={el.rating} allowHalf disabled />
                    )}
                </div>
                <div className={CSS_CommentWrap}>
                    <div className={CSS_CommentButton}>
                        <Image
                            src={edit}
                            alt="edit"
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                        />
                    </div>
                    <div className={CSS_CommentButton}>
                        {isEdit ? (
                            <Image src={check} alt="check" onClick={handleUpdate} />
                        ) : (
                            <Image src={close} alt="close" />
                        )}
                    </div>
                </div>
            </div>

            <pre className={css({ p: "1rem 0rem" })}>
                {isEdit ? <Input id="comment_ID" value={el.contents} onChange={handleChange} /> : el.contents}
            </pre>

            <div className={css({ fontSize: "1.4rem" })}>
                {isEdit ? <Input id="password_ID" onChange={handleChange} /> : el.createdAt.split("T")[0]}
            </div>
        </>
    );
}

const CSS_CommentHead = css({
    display: "flex",
    justifyContent: "space-between",
});

const CSS_CommentWrap = css({
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    height: "4rem",
});

const CSS_CommentButton = css({
    width: "4rem",
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
