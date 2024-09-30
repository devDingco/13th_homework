import Icon from "@/components/iconFactory";
import Image from "next/image";

interface CardBoxProps {
  data: {
    img: string;
    title: string;
    writer: string;
    writerimg: string;
    goodcount: number;
    writedate: string;
  };
}

export default function CardBox(props: CardBoxProps) {
  const { img, title, writer, writerimg, goodcount, writedate } = props.data;

  return (
    <div className="flex gap-2 justify-between min-w-[280px]">
      <Image src={img ?? "/images/img-0.png"} alt="" width={112} height={152} />

      <div className="flex flex-col justify-between min-w-44">
        <div className="flex flex-col gap-2">
          <h4 className="font-extrabold">{title ?? "제목"}</h4>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700">
              <span className="bg-gray-300 rounded-full w-6 h-6 overflow-hidden">
                <Image
                  src={writerimg ?? "/images/img-0.png"}
                  alt=""
                  width={24}
                  height={24}
                />
              </span>
              {writer ?? "작성자"}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-red-500 flex gap-1">
            <div className="w-6 h-6">
              <Icon icon="good" className="fill-current" />
            </div>
            <span>{goodcount ?? 0}</span>
          </div>
          <div className="font-light">{writedate ?? "0000.00.00"}</div>
        </div>
      </div>
    </div>
  );
}
