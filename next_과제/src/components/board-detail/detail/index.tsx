import Icon from "@/components/iconFactory";
import LikeCountBtn from "@/components/likeCountBtn";
import { Button, Tooltip, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { dateViewSet } from "@/utils/dateViewSet";
import { useBoardDetail } from "@/components/board-detail/detail/hook";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function BoardDetail() {
  const router = useRouter();
  const { detailData, params, error, loading } = useBoardDetail();

  if (loading) return <div>로딩중...</div>; //! 로딩중일때 디자인 변경하여 처리필요
  if (detailData === null || error) return redirect("/boards");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl">{detailData?.title}</h3>
        <div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700 dark:text-white">
              <Avatar size="small" icon={<UserOutlined />} />
              {detailData?.writer}
            </div>
            <div>{dateViewSet(detailData?.createdAt)}</div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-3 justify-end items-center">
            <Icon
              icon="link"
              className="fill-gray-800 w-6 h-6 dark:fill-white"
            />

            <Tooltip
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              mouseLeaveDelay={0.8}
              key="#fff"
              color="#fff"
              trigger={["hover"]}
              overlayInnerStyle={{ color: "#000" }}
              title={
                (detailData?.boardAddress?.address || "") +
                " " +
                (detailData?.boardAddress?.addressDetail || "")
              }
            >
              <button className="w-6 h-6">
                <Icon
                  icon="location"
                  className="fill-gray-800 w-6 h-6 dark:fill-white"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        {detailData?.youtubeUrl && (
          <div className="flex gap-4">
            {/* {detailData?.images.length > 0 &&
              detailData?.images.map((url: string, index: number) => (
                <Image
                  key={index}
                  src={url}
                  alt="content"
                  className=""
                  width="100"
                  height="100"
                />
              ))} */}
          </div>
        )}

        <div
          className="min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: detailData?.contents || "" }}
        ></div>
        {detailData?.youtubeUrl && (
          <div className="bg-gray-200 py-6">
            <div className="videoContainer max-w-4xl mx-auto">
              <iframe
                title="YouTube video player"
                src={
                  detailData?.youtubeUrl.includes(".be/") ||
                  detailData?.youtubeUrl.includes("watch?v=")
                    ? `https://www.youtube.com/embed/${
                        detailData?.youtubeUrl.split(".be/")[1] ||
                        detailData?.youtubeUrl.split("watch?v=")[1]
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
          <Button
            type="default"
            variant="outlined"
            size="large"
            icon={<Icon icon="menu" className="fill-current w-6 h-6" />}
            onClick={() => router.push(`/boards`)}
          >
            목록으로
          </Button>

          <Button
            type="default"
            shape="default"
            size="large"
            icon={<Icon icon="edit" className="fill-current w-6 h-6" />}
            onClick={() => router.push(`/boards/${params.boardId}/edit`)}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
