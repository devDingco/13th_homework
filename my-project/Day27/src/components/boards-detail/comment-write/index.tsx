import Image from "next/image";

export default function ComentWrite() {
  return (
    <div className="flex w-[1280px] gap-10">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-2">
          <div className="w-6 h-6">
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
                type="text"
                className="py-3 px-4 border opacity-[0px] rounded-[8px_0px_0px_0px] border-[0px_0px]"
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
                type="text"
                placeholder="비밀번호를 입력해 주세요."
                className="py-3 px-4 border opacity-[0px] rounded-[8px_0px_0px_0px] border-[0px_0px]"
              />
            </div>
          </div>
          <textarea
            className="gap-0 border opacity-[0px] px-4 py-3 rounded-[8px_0px_0px_0px] border-solid border-[#D4D3D3]"
            name=""
            id=""
            placeholder="댓글을 입력해 주세요."
          ></textarea>
          <div>
            <button>댓글 등록</button>
          </div>
        </div>
      </div>
      <div>
        <div>등록된 댓글이 없습니다.</div>
      </div>
    </div>
  );
}
