"use client";
import styles from "./styles.module.css";
import { schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSoftMFull } from "@/commons/ui/button";
import { InputAddress, InputNormal } from "@/commons/ui/input";
import { TextareaNormal } from "@/commons/ui/textarea";
import AddImage from "../commons/add-image";

export default function SolplaceLogsDetailEdit() {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

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
            <InputAddress
              label="플레이스 주소"
              name="address"
              type="text"
              placeholder="플레이스 주소 입력"
              readOnly={true}
            />

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
            <ButtonSoftMFull>수정</ButtonSoftMFull>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
