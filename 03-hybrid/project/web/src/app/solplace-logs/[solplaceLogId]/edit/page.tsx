"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import FormImageUpload from "@/components/form/form-image-upload";
import styles from "./styles.module.css";
import TextInput from "@/components/textInput";
import { SolPlaceLogsType } from "@/schema/schema-solplace-logs";
import AddressContainer from "@/components/addressContainer";
import TextArea from "@/components/textArea";
import ButtonPrimary from "@/components/button/button-primary";
import useHook from "./hook";
import useFormSolplace from "@/components/form/form-solplace/hook";

export default function SolplaceLogsEdit() {
  const { methods, data, handleUpdate } = useHook();
  const { onChangeFile, onClickDeleteImage } = useFormSolplace();

  return (
    <FormProvider {...methods}>
      <div className={styles.main__container__wrapper}>
        <div className={styles.main__container}>
          <FormImageUpload
            images={data.images ?? []}
            onChangeFile={onChangeFile}
            onClickDelete={onClickDeleteImage}
          />

          <TextInput<SolPlaceLogsType>
            keyName="name"
            title="플레이스 이름"
            type="text"
            placeholder="플레이스 이름을 입력해 주세요. (3자 이상)"
            required={true}
          />

          <AddressContainer />

          <TextArea<SolPlaceLogsType>
            keyName="contents"
            title="플레이스 내용"
            placeholder="플레이스 내용을 입력해 주세요. (10자 이상)"
            required={true}
          />
        </div>
        <ButtonPrimary
          label="수정"
          onClick={methods.handleSubmit((data) => handleUpdate(data))}
          disabled={!methods.formState.isValid}
        />
      </div>
    </FormProvider>
  );
}
