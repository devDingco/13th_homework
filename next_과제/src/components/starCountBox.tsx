import Icon from "@/components/iconFactory";

interface IstarCountbox {
  onClick?: () => void;
  readOnly?: boolean;
  starCount?: number;
}

export default function StarCountBox(props: IstarCountbox) {
  const { onClick, readOnly, starCount = 0 } = props;

  // 별점 클릭 이벤트 - readOnly가 false일 때만 작동
  const startEventHandler = (e: React.MouseEvent, idx: number) => {
    const targetParent = e.currentTarget.parentElement as HTMLElement;
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    if (!targetParent) return;
    targetParent.querySelectorAll("button").forEach((el, elIndex) => {
      const icon = el.querySelector("span");
      if (icon) {
        if (idx >= elIndex) {
          icon.classList.add("fill-yellow-500");
          icon.classList.remove("fill-gray-500");
        } else {
          icon.classList.add("fill-gray-500");
          icon.classList.remove("fill-yellow-500");
        }
      }
    });
  };

  return (
    <div className={`flex startCountBox ${readOnly ? "" : "gap-2"}`}>
      {new Array(5).fill(1).map((_, idx) => (
        <button
          key={idx}
          className={`w-6 h-6 ${readOnly ? "cursor-default" : ""}`}
          onClick={!readOnly ? (e) => startEventHandler(e, idx) : undefined}
        >
          <Icon
            icon="star"
            className={`${
              starCount
                ? starCount - 1 >= idx
                  ? "fill-yellow-500"
                  : "fill-gray-500"
                : "fill-gray-500"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
