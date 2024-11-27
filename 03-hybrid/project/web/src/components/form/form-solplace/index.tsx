"use client";
import { Controller, FormProvider } from "react-hook-form";
import PreviewImage from "@/components/previewImage";
import UploadImage from "@/components/upload-image";
import TextInput from "@/components/textInput";
import { SolPlaceLogsType } from "@/schema/schema-solplace-logs";
import AddressContainer from "@/components/addressContainer";
import TextArea from "@/components/textArea";
import ButtonPrimary from "@/components/button/button-primary";
import useFormSolplace from "./hook";
import styles from "./styles.module.css";

export default function FormSolplace() {
  const {
    methods,
    uploadedImages,
    control,
    formState,
    handleSubmit,
    onChangeFile,
    onClickButton,
  } = useFormSolplace();
  return (
    <FormProvider {...methods}>
      <div className={styles.main__container__wrapper}>
        <div className={styles.main__container}>
          <div className={styles.image__box}>
            {uploadedImages.map((el, index) => (
              <PreviewImage key={index} src={el} />
            ))}
            <Controller
              name="images"
              control={control}
              render={() => <UploadImage onChangeFile={onChangeFile} />}
            />
          </div>

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
          label="로그 등록"
          onClick={handleSubmit(onClickButton)}
          disabled={!formState.isValid}
        />
      </div>
    </FormProvider>
  );
}
