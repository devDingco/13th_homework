"use client";

import { useEffect } from "react";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";

export const useInitialize = (methods: UseFormReturn<ISchema>) => {
  // 쿼리스트링에서 뽑기
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  // useEffect를 사용하여 초기값 설정
  useEffect(() => {
    if (title) methods.setValue("title", title);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
    methods.trigger();
  }, [title, contents, address, methods]);

  const { fetchApp } = useDeviceSetting();

  const onSubmit = () => {
    fetchApp({ query: "requestDeviceNotificationsForPermissionSet" });
    fetchApp({
      query: "createDeviceNotificationsForSubmitSet",
      variables: { page: "/solplace-logs/1" },
    });
  };

  return {
    onSubmit,
  };
};
