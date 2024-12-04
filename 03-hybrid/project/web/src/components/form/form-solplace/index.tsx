"use client";
import { FormProvider } from "react-hook-form";
import { SolPlaceLogsType } from "@/schema/schema-solplace-logs";
import useFormSolplace from "./hook";

import FormImageUpload from "../form-image-upload";
import TextInput from "@/components/textInput";
import AddressContainer from "@/components/addressContainer";
import TextArea from "@/components/textArea";
import ButtonPrimary from "@/components/button/button-primary";

import styles from "./styles.module.css";
import Footer from "@/commons/layout/footer";

export default function FormSolplace() {
  const {
    methods,
    reverseUploadImages,
    formState,
    handleSubmit,
    handleCreate,
    onChangeFile,
    onClickDeleteImage,
  } = useFormSolplace();

  return (
    <FormProvider {...methods}>
      <div className={styles.main__container__wrapper}>
        <div className={styles.main__container}>
          <FormImageUpload
            images={reverseUploadImages}
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
        <Footer>
          <ButtonPrimary
            label="로그 등록"
            onClick={handleSubmit(handleCreate)}
            disabled={!formState.isValid}
          />
        </Footer>
      </div>
    </FormProvider>
  );
}
