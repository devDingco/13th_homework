import Image from "next/image";
import useCommentList from "./hook";

export default function CommentList() {
  const { data } = useCommentList();

  return data?.fetchBoardComments.map((el, index) => (
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
          <div>별점박스</div>
        </div>
        <div className="flex gap-2">
          <div className="w-5 h-5 relative">
            <Image src="/img/edit.svg" alt="editImage" fill objectFit="cover" />
          </div>
          <div className="w-5 h-5 relative">
            <Image
              src="/img/close.svg"
              alt="closeImage"
              fill
              objectFit="cover"
            />
          </div>
          <div className="w-5 h-5 relative"></div>
        </div>
      </div>
      <div className="w-full font-normal text-4 leading-6 text-[#333333]">
        {el.contents}
      </div>
      <div className="font-normal text-[14px] leading-5 text-[#818181]">
        {el.createdAt.split("T")[0].replace(/-/g, ".")}
      </div>
    </div>
  ));
}
