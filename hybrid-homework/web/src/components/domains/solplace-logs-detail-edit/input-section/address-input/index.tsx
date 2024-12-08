"use client";

import { InputAddress } from "@/components/commons/input";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { ISchema } from "../../form.schema";

export default function SolplaceInputAddress() {
  const router = useRouter();
  const pathname = usePathname();
  const { solplaceLogId } = useParams();
  const { watch } = useFormContext();
  const { title, contents } = watch();

  const url = `/solplace-logs/${solplaceLogId}/edit/map?title=${title}&contents=${contents}&redirect=${pathname}`;
  // map 인풋 클릭 시 지도 페이지로 이동
  const onClickAddressInput = () => {
    router.push(url);
  };

  return (
    <InputAddress<ISchema>
      label="플레이스 주소"
      name="address"
      placeholder="플레이스 주소 입력"
      readOnly={true}
      onClick={onClickAddressInput}
    />
  );
}
