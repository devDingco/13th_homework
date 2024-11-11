"use client";
import { Modal } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";

export default function ContactModal({ isModalOpen, toggleModal }) {
  const onFinish = (values) => {
    // TODO: 여기서 API 호출하기
  };

  return (
    <div>
      <Modal open={isModalOpen} onCancel={toggleModal} footer={null}>
        {/* 여기 모달 만들기  */}
        <div className={styles.contact_modal}>
          <div className={styles.seller_info}>
            <Image
              src="/images/profile.png"
              alt="판매자 프로필"
              width={64}
              height={64}
              className={styles.seller_image}
            />
            <div>
              <h3 className={styles.seller_name}>김디자인</h3>
              <p className={styles.seller_title}>로고 디자인 전문가</p>
            </div>
          </div>
          <textarea
            placeholder="정확하게 빠른 답변을 위해 요구사항을 상세하게 알려주세요."
            className={styles.contact_contents}
          />
          <div className={styles.contact_button_container}>
            <button className={styles.contact_button}>문의하기</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
