"use client";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";

import PlaceFormButton from "../commons/place-form-button";
import PlaceForm from "../commons/place-form";

export default function SolplaceLogsNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 쿼리스트링에서 뽑기
  const name = searchParams.get("name");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { fetchApp } = useDeviceSetting();

  useEffect(() => {
    if (name) methods.setValue("name", name);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
    methods.trigger();
  }, [name, contents, address, methods]);

  // map 페이지로 이동
  const onClickAddressInput = () => {
    router.push(
      `/solplace-logs/new/map?name=${methods.getValues(
        "name"
      )}&contents=${methods.getValues(
        "contents"
      )}&redirectUrl=/solplace-logs/new`
    );
  };

  const onClickSubmit = () => {
    fetchApp({ query: "requestDeviceNotificationsForPermissionSet" });
    fetchApp({
      query: "createDeviceNotificationsForSubmitSet",
      variables: { page: "/solplace-logs/1" },
    });
  };

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form
          className={styles.register}
          onSubmit={methods.handleSubmit(onClickSubmit)}
        >
          <PlaceForm onClickAddressInput={onClickAddressInput} />
          <PlaceFormButton isEdit={false} />
        </form>
      </FormProvider>
    </div>
  );
}
