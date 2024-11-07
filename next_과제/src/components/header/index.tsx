"use client";
import Link from "next/link";
import Image from "next/image";
import { Button, Select } from "antd";
import Icon from "@/components/icon-factory";
import { useHeader } from "./hook";
import styles from "./index.module.scss";
import { useLoadStore } from "@/commons/stores/load-store";
import { useAccessTokenStore } from "@/commons/stores/access-token";

const Header = () => {
  const { isLoaded } = useLoadStore();
  const { accessToken } = useAccessTokenStore();

  const {
    isHeaderHide,
    menuItems,
    menuItemRef,
    router,
    menuMouseOver,
    menuMouseLeave,
    data,
    userLogOut,
    onChargePriceChange,
    chargeModalVisible,
    setChargeModalVisible,
    onCharging,
    chargeOptions,
    myInfoPopToggle,
    myInfoPopRef,
  } = useHeader();

  if (!isHeaderHide)
    return (
      <>
        {chargeModalVisible && (
          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
            <div
              className="w-full h-full bg-[rgba(0,0,0,0.5)] fixed z-30"
              onClick={() => setChargeModalVisible(false)}
            ></div>
            <div className="bg-white flex gap-3 items-center flex-col w-80 p-6 rounded-xl relative z-40">
              <Icon
                icon="point2"
                className="w-[80px] h-[56px] fill-[--primary-color]"
                viewBox="0 0 80 56"
              />
              <p>충전하실 금액을 선택해 주세요</p>
              <Select
                className="w-full"
                size="large"
                showSearch
                placeholder="충전 금액 선택"
                onChange={(value) => onChargePriceChange(value)}
                optionFilterProp="label"
                options={chargeOptions}
              />
              <div className="flex gap-3">
                <Button
                  type="default"
                  size="large"
                  onClick={() => setChargeModalVisible(false)}
                >
                  취소
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => onCharging()}
                >
                  충전하기
                </Button>
              </div>
            </div>
          </div>
        )}

        <header
          onMouseLeave={() => menuMouseLeave()}
          className="max-w-7xl flex justify-between items-center m-auto p-4 navbar max-xl:pr-24"
        >
          <nav className="flex items-center gap-6">
            <h1>
              <Link href={"/"}>
                <Image
                  className="dark:invert"
                  src="/images/logo.png"
                  alt="트립트립"
                  width={52}
                  height={32}
                  style={{ cursor: "pointer", width: "52px", height: "32px" }}
                />
              </Link>
            </h1>
            <ul id={styles.menu} ref={menuItemRef} data-header-leave="false">
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  onMouseOver={(e) => menuMouseOver(e)}
                  className={item.children ? styles.subMenuParent : ""}
                >
                  <Link href={item.key || "#"}>
                    <span>{item.label}</span>
                  </Link>
                  {item.children && (
                    <ul className={styles.subMenu}>
                      {item.children.map((child) => (
                        <li
                          key={child.key}
                          onClick={() => {
                            router.push(child.key);
                          }}
                        >
                          <Link href={child.key}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-6">
            {isLoaded && accessToken !== "" ? (
              <div className="flex justify-end items-center relative">
                <button
                  className="flex gap-1 items-center"
                  onClick={() => myInfoPopToggle()}
                >
                  <Image
                    src={data?.picture ?? "/images/profile.png"}
                    alt={data?.name + "님의 프로필 사진"}
                    width={40}
                    height={40}
                  />
                  <div className="w-6 h-6">
                    <div className="blind">펼쳐보기</div>
                    <Icon icon="downArrow" className="w-6 h-6" />
                  </div>
                </button>
                <div
                  ref={myInfoPopRef}
                  className="cursor-pointer min-w-60 absolute z-20 bg-white text-nowrap right-0 top-0 shadow-lg rounded-lg p-5 flex flex-col gap-3 border border-gray-100 hidden"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={data?.picture ?? "/images/profile.png"}
                        alt={data?.name + "님의 프로필 사진"}
                        width={40}
                        height={40}
                      />
                      <span>{data?.name}</span>
                    </div>
                    <button onClick={() => myInfoPopToggle()}>
                      <div className="blind">펼쳐보기</div>
                      <Icon
                        icon={
                          myInfoPopRef.current?.classList.contains("hidden")
                            ? "downArrow"
                            : "upArrow"
                        }
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                  <hr />
                  <div className="flex gap-2">
                    <Icon icon="point" className="w-6 h-6" />
                    <span className="text-base font-medium">
                      {data?.userPoint?.amount.toLocaleString("ko-KR")}P
                    </span>
                  </div>
                  <hr />
                  <ul className="flex flex-col">
                    <li>
                      <button
                        onClick={() => setChargeModalVisible(true)}
                        className="py-2 flex items-center gap-1"
                      >
                        <Icon icon="charge" className="w-4 h-4" />
                        <span className="text-sm">포인트 충전</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => userLogOut()}
                        className="py-2 flex items-center gap-1"
                      >
                        <Icon icon="logout" className="w-4 h-4" />
                        <span className="text-sm">로그아웃</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Button
                style={{ paddingRight: "15px" }}
                color="default"
                variant="solid"
                // type="default"
                shape="round"
                size="large"
                onClick={() => router.push("/login")}
                icon={
                  <Icon
                    icon="rightArrow"
                    className="w-5 h-5 flex"
                    viewBox="-3 0 24 24"
                  />
                }
                iconPosition="end"
              >
                로그인
              </Button>
            )}
          </div>
        </header>
      </>
    );
};
export default Header;
