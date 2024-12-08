"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";

export const useInitialize = (methods: UseFormReturn<ISchema>) => {
  // 쿼리스트링에서 뽑기
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  useEffect(() => {
    if (title) methods.setValue("title", title);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
    methods.trigger();
  }, [title, contents, address, methods]);

  const { fetchApp } = useDeviceSetting();

  // 등록하기 버튼 클릭 시
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
