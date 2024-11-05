import { Tabs, TabsProps } from "antd";
import Image from "next/image";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "트립토크",
  },
  {
    key: "2",
    label: "숙박권 구매",
  },
  {
    key: "3",
    label: "마이 페이지",
  },
];

const onChange = () => {};

export default function Navigation() {
  return (
    <div className="flex gap-6">
      <div className="w-[51.52px] h-[32px]">
        <Image src="/img/logo.svg" alt="logoImg" fill objectFit="cover" />
      </div>
      <div className="gap-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}
