import Icon from "@/components/iconFactory";
import LikeCountBtn from "@/components/likeCountBtn";
import Image from "next/image";
import Link from "next/link";

import { dateViewSet } from "@/utils/dateViewSet";
import { useBoardDetail } from "@/components/board-detail/detail/hook";
import { redirect } from "next/navigation";

export default function BoardDetail() {
  const { detailData, params, error } = useBoardDetail();
  // console.log(error);

  if (detailData === null || error) return redirect("/boards");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl">{detailData?.title}</h3>
        <div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700">
              <Icon
                icon="mypage"
                className="bg-gray-300 rounded-full w-6 h-6"
              />

              {detailData?.writer}
            </div>
            <div>{dateViewSet(detailData?.createdAt)}</div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2 justify-end">
            <Icon icon="link" className="fill-gray-800 w-6 h-6" />
            <Icon icon="location" className="fill-gray-800 w-6 h-6" />
          </div>
        </div>
        {detailData?.youtubeUrl && (
          <div className="flex gap-4">
            {detailData?.images.length > 0 &&
              detailData?.images.map((url: string, index: number) => (
                <Image
                  key={index}
                  src={url}
                  alt="content"
                  className=""
                  width="100"
                  height="100"
                />
              ))}
          </div>
        )}

        <div
          className="min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: detailData?.contents }}
        ></div>
        {detailData?.youtubeUrl && (
          <div className="bg-gray-200 py-6">
            <div className="videoContainer max-w-4xl mx-auto">
              <iframe
                title="YouTube video player"
                src={
                  detailData?.youtubeUrl.includes(".be/")
                    ? `https://www.youtube.com/embed/${
                        detailData?.youtubeUrl.split(".be/")[1]
                      }`
                    : detailData?.youtubeUrl
                }
              ></iframe>
            </div>
          </div>
        )}

        <div className="flex gap-6 justify-center">
          <LikeCountBtn type="dislike" />
          <LikeCountBtn type="like" />
        </div>

        <div className="flex gap-6 justify-center">
          <Link className="btn btn-outline" href={`/boards`}>
            <Icon icon="menu" className="fill-current w-6 h-6" />
            목록으로
          </Link>
          <Link
            className="btn btn-outline"
            href={`/boards/${params.boardId}/edit`}
          >
            <Icon icon="edit" className="fill-current w-6 h-6" />
            수정하기
          </Link>
        </div>
      </div>
    </div>
  );
}
