"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";
import { useImageStore } from "@/commons/stores/image-store";

export const useInitialize = (methods: UseFormReturn<ISchema>) => {
  const router = useRouter();
  // 쿼리스트링에서 뽑기
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const contents = searchParams.get("contents");
  const address = searchParams.get("address");

  const images = useImageStore((state) => state.images);
  const clearImages = useImageStore((state) => state.clearImages);

  useEffect(() => {
    if (title) methods.setValue("title", title);
    if (images) methods.setValue("images", images);
    if (contents) methods.setValue("contents", contents);
    if (address) methods.setValue("address", address);
    methods.trigger();
  }, [title, images, contents, address, methods]);

  const { fetchApp } = useDeviceSetting();

  // 등록하기 버튼 클릭 시
  const onSubmit = () => {
    router.push("/solplace-logs");
    fetchApp({ query: "requestDeviceNotificationsForPermissionSet" });
    fetchApp({
      query: "createDeviceNotificationsForSubmitSet",
      variables: { page: "/solplace-logs/1" },
    });
    clearImages();
  };

  return {
    onSubmit,
  };
};
