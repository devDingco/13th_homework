"use client";

import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { InputAddress } from "../../input";

export default function SolplaceInputAddress() {
  const router = useRouter();
  const pathname = usePathname();
  const { watch } = useFormContext();
  const { title, contents } = watch();

  const url = `/solplace-logs/new/map?title=${title}&contents=${contents}&redirect=${pathname}`;
  // map 인풋 클릭 시 지도 페이지로 이동
  const onClickAddressInput = () => {
    router.push(url);
  };

  return (
    <InputAddress
      label="플레이스 주소"
      name="address"
      type="text"
      placeholder="플레이스 주소 입력"
      readOnly={true}
      onClick={onClickAddressInput}
    />
  );
}
