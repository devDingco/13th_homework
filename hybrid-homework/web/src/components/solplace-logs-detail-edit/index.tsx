"use client";
import styles from "./styles.module.css";
import { schema } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PlaceFormButton from "../commons/place-form-button";
import PlaceForm from "../commons/place-form";

export default function SolplaceLogsDetailEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // 쿼리 스트링 값 가져오기
  const name = searchParams.get("name");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  // useEffect를 사용하여 초기값 설정
  useEffect(() => {
    if (name) methods.setValue("name", name);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
  }, [name, contents, address, methods]);

  const onClickAddressInput = () => {
    router.push(
      `/solplace-logs/123/edit/map?name=${methods.getValues(
        "name"
      )}&contents=${methods.getValues(
        "contents"
      )}&redirectUrl=/solplace-logs/123/edit`
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
          <PlaceForm onClickAddressInput={onClickAddressInput} />
          <PlaceFormButton isEdit={true} />
        </form>
      </FormProvider>
    </div>
  );
}
