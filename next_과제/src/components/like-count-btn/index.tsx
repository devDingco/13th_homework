import Icon from "@/components/icon-factory";
import { useLikeCount } from "@/components/like-count-btn/hook";
import { LikeCountBtnProps } from "@/components/like-count-btn/types";

export default function LikeCountBtn(props: LikeCountBtnProps) {
  const { type } = props;
  const { likeCountHandler, data } = useLikeCount(type);

  return (
    <button
      className="flex items-center flex-col gap-1"
      onClick={() => likeCountHandler()}
    >
      <div className="w-6 h-6">
        <Icon
          icon={type === "like" ? "good" : "bad"}
          className={type === "like" ? "fill-red-600" : "fill-gray-600"}
        ></Icon>
      </div>
      <div className={type === "like" ? "text-red-600" : "text-gray-600"}>
        {data &&
          (type === "like"
            ? data?.fetchBoard.likeCount
            : data?.fetchBoard.dislikeCount)}
      </div>
    </button>
  );
}
