"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { ButtonPrimaryMFull } from "@/components/commons/button";

interface AddressBottomProps {
  isEdit: boolean;
}

export default function AddressBottom({ isEdit }: AddressBottomProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const address = searchParams.get("address") || "";
  const title = searchParams.get("title");
  const contents = searchParams.get("contents");

  // 지도등록  지도수정 눌렀을 시 redirect-url 로 쿼리스트링과 함꼐 페이지 이동
  const onClickAddMap = () => {
    router.push(
      `${redirect}?title=${title}&contents=${contents}&address=${address}`
    );
  };

  return (
    <div className={styles.buttonContainer}>
      <input type="text" className={styles.address} value={address} readOnly />
      <ButtonPrimaryMFull onClick={onClickAddMap}>
        이 위치로 {isEdit ? "수정" : "등록"}
      </ButtonPrimaryMFull>
    </div>
  );
}
