import Image from "next/image";
import useCommentWrite from "./hook";
import CommentList from "../comment-list";
import useCommentList from "../comment-list/hook";

export default function CommentWrite() {
  const { onChangeInput, onClickRegister } = useCommentWrite();
  const { data } = useCommentList();
  console.log(data, "코멘트 리스트 데이터 확인");
  return (
    <div className="flex flex-col w-[1280px] gap-10">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-2">
          <div className="w-6 h-6 relative">
            <Image src="/img/chat.svg" alt="chatImg" fill object-fit="cover" />
          </div>
          <div className="font-semibold text-4 leading-6">댓글</div>
        </div>

        <div>별점</div>
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
                type="text"
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
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={onClickRegister}
              className="h-48px py-3 px-4 rounded-lg bg-[#c7c7c7c7] text-[#e4e4e4]"
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>
      {data?.fetchBoardComments ? (
        <CommentList />
      ) : (
        <div className="flex justify-center">
          <div>등록된 댓글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}
