import Image from "next/image";
import styles from "./styles.module.css";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  CreatePointTransactionOfLoadingDocument,
  FetchUserLoggedInDocument,
  LogoutUserDocument,
} from "@/commons/graphql/graphql";
import { useRouter } from "next/navigation";
import { ChevronDown, Coins, LogOut, Wallet } from "lucide-react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { useState } from "react";
import { Modal } from "antd";
import { successModal } from "@/utils/modal";

const CHARGE_OPTIONS = [
  { value: 10000, label: "10,000원" },
  { value: 30000, label: "30,000원" },
  { value: 50000, label: "50,000원" },
  { value: 100000, label: "100,000원" },
];

export default function UserMenu(props) {
  const router = useRouter();
  const client = useApolloClient();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { setAccessToken } = useAccessTokenStore();
  const [logoutUser] = useMutation(LogoutUserDocument, {
    onCompleted: () => {
      setAccessToken("");
      client.cache.evict({ fieldName: "fetchUserLoggedIn" });
      client.cache.gc();
      router.push("/products");
    },
    onError: (error) => {
      console.error("Logout Error:", error);
    },
  });

  const [createPointTransactionOfLoading] = useMutation(
    CreatePointTransactionOfLoadingDocument
  );

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
    toggleDropdown();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAmount(null); // 모달 닫힐 때 선택된 금액 초기화
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
  };

  // 로그인한 유저에 충전한 포인트 넣어주기
  const pointMutation = async (paymentId) => {
    try {
      const result = await createPointTransactionOfLoading({
        variables: {
          paymentId,
        },
        refetchQueries: [{ query: FetchUserLoggedInDocument }],
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPoint = async () => {
    if (!props.data) return;
    try {
      const result = await PortOne.requestPayment({
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: uuidv4(),
        orderName: "Point",
        totalAmount: Number(selectedAmount),
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        customer: {
          fullName: "ming",
          phoneNumber: "010-1234-5678",
          email: "aabbcc@naver.com",
          address: {
            country: "COUNTRY_KR",
            addressLine1: "서울시",
            addressLine2: "3층",
          },
          zipcode: "11111",
        },
        redirectUrl: "http://localhost:3000",
      });
      console.log(result);
      pointMutation(result?.paymentId);
      // 포인트모달 닫기
      setIsModalOpen(false);
      successModal("충전이 완료되었습니다");
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  // 로그아웃
  const onClickLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.user_profile}>
      <Image
        src="/images/profile.png"
        width={30}
        height={30}
        alt="프로필 이미지"
      />
      <ChevronDown color="#919191" size={16} onClick={toggleDropdown} />
      {isDropDownOpen && (
        <div className={styles.dropdown_content}>
          <div className={styles.dropdown_label}>
            <p className={styles.user_name}>
              {props.data?.fetchUserLoggedIn.name} 고객님
            </p>
            <div className={styles.points_container}>
              <Coins color="#ffd700" />
              <span className={styles.points_value}>
                {props.data?.fetchUserLoggedIn.userPoint.amount} P
              </span>
            </div>
          </div>
          <div className={styles.dropdown_separator} />
          <div className={styles.dropdown_item} onClick={openModal}>
            <Wallet className={styles.dropdown_item_icon} />
            <span>포인트 충전</span>
          </div>
          <div className={styles.dropdown_item} onClick={onClickLogout}>
            <LogOut className={styles.dropdown_item_icon} />
            <span>로그아웃</span>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          closable={false}
        >
          <h2 className={styles.modal_title}>포인트 충전</h2>
          <div className={styles.charge_options}>
            {CHARGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`${styles.charge_option} ${
                  selectedAmount === option.value ? styles.selected : ""
                }`}
                onClick={() => handleAmountClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className={styles.modal_actions}>
            <button
              className={styles.charge_button}
              onClick={onClickPoint}
              disabled={!selectedAmount}
            >
              충전하기
            </button>
            <button className={styles.cancel_button} onClick={closeModal}>
              취소
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
