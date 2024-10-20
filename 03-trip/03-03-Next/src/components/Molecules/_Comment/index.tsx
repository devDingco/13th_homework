"use client";

import { Rate } from "antd";

import Image from "next/image";
import profile from "/public/svg/person.svg";
import edit from "/public/svg/edit.svg";
import close from "/public/svg/close.svg";
import check from "/public/svg/check.svg";

import {
    comment_btn,
    comment_input,
    comment_label,
} from "@/commons/styles/commentStyles";
import { useState } from "react";
import Input from "@/components/Atoms/_Input";
import { useMutation } from "@apollo/client";
import { UpdateBoardCommentDocument } from "@/commons/graphql/graphql";

export default function CommentUI({ el, idx, data }) {
    const [isEdit, setIsEdit] = useState(false);
    const [comment, setComment] = useState();
    const [stars, setStars] = useState(0);
    const [password, setPassword] = useState();

    function handleChange(e) {
        switch (e.target.id) {
            case "comment": {
                setComment(e.target.value);
                console.log(comment);
                break;
            }
            case "password": {
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
            alert("댓글을 수정하였습니다!");
            setIsEdit(!isEdit);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div style={comment_input}>
                <div style={comment_label}>
                    <Image src={profile} alt="profile" />
                    <div>{el.writer}</div>
                    {isEdit ? (
                        <Rate value={stars} onChange={setStars} allowHalf />
                    ) : (
                        <Rate value={el.rating} allowHalf disabled />
                    )}
                </div>
                <div style={comment_label}>
                    <div style={comment_btn}>
                        <Image
                            src={edit}
                            alt="edit"
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                        />
                    </div>
                    <div style={comment_btn}>
                        {isEdit ? (
                            <Image
                                src={check}
                                alt="check"
                                onClick={handleUpdate}
                            />
                        ) : (
                            <Image src={close} alt="close" />
                        )}
                    </div>
                </div>
            </div>

            <pre>
                {isEdit ? (
                    <Input
                        id="comment"
                        value={data.fetchBoardComments[idx].contents}
                        onChange={handleChange}
                    />
                ) : (
                    el.contents
                )}
            </pre>

            <div>
                {isEdit ? (
                    <Input id="password" onChange={handleChange} />
                ) : (
                    el.createdAt.split("T")[0]
                )}
            </div>
            <br />
        </>
    );
}
