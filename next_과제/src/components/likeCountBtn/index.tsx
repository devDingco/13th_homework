import Icon from "@/components/iconFactory";
import { useLikeCount } from "@/components/likeCountBtn/hook";
import { LikeCountBtnProps } from "@/components/likeCountBtn/types";

export default function LikeCountBtn(props: LikeCountBtnProps) {
  const { type } = props;
  const { likeCountHandler, likeCount } = useLikeCount(type);

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
        {likeCount}
      </div>
    </button>
  );
}
