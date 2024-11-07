import { Rate } from "antd";
import Image from "next/image";
import CommentWrite from "../comment-write";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";
import { useParams } from "next/navigation";

export default function CommentListItem({ el }) {
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [deleteBoard] = useMutation(DELETE_BOARD_COMMENT);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickDelete = async () => {
    const password = prompt("댓글을 삭제하시겠습니다.");
    deleteBoard({
      variables: {
        password,
        boardCommentId: el._id,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD_COMMENTS,
          variables: {
            boardId: params.boardId,
          },
        },
      ],
    });
  };

  return (
    <>
      {!isEdit ? (
        <div className="w-full flex flex-col gap-2" key={el._id}>
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/img/profile.svg"
                    alt="프로파일이미지"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="font-light text-[14px] leading-5 text-[#5f5f5f]">
                  {el.writer}
                </div>
              </div>
              <div>
                <Rate disabled={true} value={el.rating} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 relative" onClick={onClickEdit}>
                <Image
                  src="/img/edit.svg"
                  alt="editImage"
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="w-5 h-5 relative" onClick={onClickDelete}>
                <Image
                  src="/img/close.svg"
                  alt="closeImage"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full font-normal text-4 leading-6 text-[#333333]">
            {el.contents}
          </div>
          <div className="font-normal text-[14px] leading-5 text-[#818181]">
            {el.createdAt.split("T")[0].replace(/-/g, ".")}
          </div>
        </div>
      ) : (
        <CommentWrite
          key={el._id}
          el={el}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
}
