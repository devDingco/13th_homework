import Image from "next/image";
import useCommentWrite from "./hook";
import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import useCommentList from "../comment-list/hook";

export default function CommentWrite({ isEdit, el, setIsEdit }) {
  const {
    onChangeInput,
    onClickRegister,
    onChangeRating,
    onClickEdit,
    comment,
  } = useCommentWrite(setIsEdit);

  return (
    <div className="flex flex-col w-[1280px] gap-10 mx-auto">
      <div className="flex flex-col gap-6 w-full">
        {!isEdit ? (
          <div className="flex gap-2">
            <div className="w-6 h-6 relative">
              <Image
                src="/img/chat.svg"
                alt="chatImg"
                fill
                object-fit="cover"
              />
            </div>
            <div className="font-semibold text-4 leading-6">댓글</div>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="w-6 h-6 relative">
              <StarOutlined />
            </div>
            <div className="font-semibold text-4 leading-6">별점</div>
          </div>
        )}

        <div>
          <Rate onChange={onChangeRating} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-medium text-4 leading-6 text-[#333333]"
              >
                작성자
              </label>
              <input
                onChange={onChangeInput}
                name="writer"
                type="text"
                className="py-3 px-4 border rounded-lg "
                placeholder="작성자 명을 입력해 주세요."
                defaultValue={isEdit && el.writer}
                disabled={isEdit}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-medium text-4 leading-6 text-[#333333]"
              >
                비밀번호
              </label>
              <input
                name="password"
                onChange={onChangeInput}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className="py-3 px-4 border rounded-lg"
              />
            </div>
          </div>
          <textarea
            className="w-full h-[144px] gap-0 border px-4 py-3 rounded-lg border-solid border-[#D4D3D3] resize-none"
            onChange={onChangeInput}
            name="contents"
            id=""
            placeholder="댓글을 입력해 주세요."
            defaultValue={isEdit ? el.contents : comment.contents}
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={isEdit ? () => onClickEdit(el._id) : onClickRegister}
              className="h-48px py-3 px-4 rounded-lg bg-[#c7c7c7c7] text-[#e4e4e4]"
            >
              {!isEdit ? "댓글 등록" : "수정 하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
