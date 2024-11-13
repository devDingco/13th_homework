import { useAccessTokenStore } from "@/commons/stores/access-token-store";
import { RightOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import useNavigation from "./hook";

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

// const onChange = () => {};

export default function Navigation() {
  const { accessToken } = useAccessTokenStore();
  const { onClickLogout } = useNavigation();

  return (
    <div className="flex w-[1280px] mx-auto h-20 justify-between py-5">
      <div className="flex gap-6 items-center">
        <div className="relative w-[52px] h-[32px]">
          <Image
            src="/img/logo.svg"
            alt="logoImg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="gap-4">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
      {/* 로그인프로필 */}
      {accessToken ? (
        <div className="flex gap-2 items-center" onClick={onClickLogout}>
          <div className="size-10 relative">
            <Image
              src="/img/profile.svg"
              alt="profileImg"
              fill
              objectFit="cover"
            />
          </div>
          <div className="size-6 relative">
            <Image
              src="/img/down_arrow.svg"
              alt="down_arrow_img"
              fill
              objectFit="cover"
            />
          </div>
        </div>
      ) : (
        <Link href="/login">
          <div className="flex h-[40px] rounded-[100px] py-2 px-3 bg-[#000000] gap-2 items-center">
            <div className="font-semibold text-[14px] leading-5 text-center text-[#ffffff]">
              로그인
            </div>
            <div>
              <RightOutlined className="text-[#ffffff]" />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
