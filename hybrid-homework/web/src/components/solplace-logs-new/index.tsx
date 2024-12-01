"use client";
import styles from "./styles.module.css";
import { schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSoftMFull } from "@/commons/ui/button";
import { InputAddress, InputNormal } from "@/commons/ui/input";
import { TextareaNormal } from "@/commons/ui/textarea";
import AddImage from "../commons/add-image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SolplaceLogsNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const name = searchParams.get("name");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  useEffect(() => {
    if (name) methods.setValue("name", name);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
  }, [name, contents, address, methods]);

  const onClickAddressInput = () => {
    router.push(
      `/solplace-logs/new/map?name=${methods.getValues(
        "name"
      )}&contents=${methods.getValues(
        "contents"
      )}&redirectUrl=/solplace-logs/new`
    );
  };

  const onClickSubmit = () => {};

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form
          className={styles.register}
          onSubmit={methods.handleSubmit(onClickSubmit)}
        >
          <div className={styles.main}>
            {/* 이미지 등록 */}
            <AddImage />

            {/* 플레이스 이름 */}
            <InputNormal
              label="플레이스 이름"
              name="name"
              type="text"
              placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
              isRequired={true}
            />

            {/* 플레이스 주소 */}
            <div onClick={onClickAddressInput}>
              <InputAddress
                label="플레이스 주소"
                name="address"
                type="text"
                placeholder="플레이스 주소 입력"
                readOnly={true}
              />
            </div>

            {/* 플레이스 내용 */}
            <TextareaNormal
              name="contents"
              label="플레이스 내용"
              placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
              isRequired={true}
            />
          </div>

          {/* 등록 버튼 */}
          <div className={styles.button}>
            <ButtonSoftMFull>로그 등록</ButtonSoftMFull>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
