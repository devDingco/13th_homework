"use client";
import { ChangeEvent } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SolPlaceLogsSchema,
  SolPlaceLogsType,
} from "@/schema/schema-solplace-logs";
import { ApolloError, useMutation } from "@apollo/client";
import { UploadFileDocument } from "@/gql/graphql";

import IconLeftArrow from "@/components/icon/icon-left_arrow";
import TextInput from "@/components/textInput";
import ButtonPrimary from "@/components/button/button-primary";
import AddressContainer from "@/components/addressContainer";
import UploadImage from "@/components/upload-image";
import TextArea from "@/components/TextArea";

import styles from "./styles.module.css";
import PreviewImage from "@/components/PreviewImage";

export default function SoloPlaceLogsNewPage() {
  const methods = useForm<SolPlaceLogsType>({
    resolver: zodResolver(SolPlaceLogsSchema),
  });
  const { setValue, watch, handleSubmit, control, formState } = methods;
  const [uploadFile] = useMutation(UploadFileDocument);

  const uploadedImages = watch("images") || [];

  const onClickButton = () => {
    console.log("버튼을 눌렀습니다.");
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file === undefined) return;

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });

      setValue(
        `images.${uploadedImages.length}`,
        result.data?.uploadFile.url ?? "",
        { shouldDirty: true }
      );
    } catch (error: unknown) {
      if (error instanceof ApolloError) alert(error.graphQLErrors[0].message);
    }
  };

  return (
    <div>
      <div className={styles.navigation__container}>
        <IconLeftArrow />
        <p>플레이스 등록</p>
      </div>
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
    </div>
  );
}
