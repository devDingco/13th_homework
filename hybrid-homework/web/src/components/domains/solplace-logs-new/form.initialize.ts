"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";
import { useImageStore } from "@/commons/stores/image-store";
import { gql, useMutation } from "@apollo/client";
import { webviewlog } from "@/commons/libraries/webview-log";

const CREATE_SOLPLACE_LOG = gql`
  mutation createSolplaceLog($createSolplaceLogInput: CreateSolplaceLogInput!) {
    createSolplaceLog(createSolplaceLogInput: $createSolplaceLogInput) {
      id
      title
      contents
      address
    }
  }
`;

export const useInitialize = (methods: UseFormReturn<ISchema>) => {
  const [createSolplaceLog] = useMutation(CREATE_SOLPLACE_LOG);
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
  const onSubmit = async (data: ISchema) => {
    const { title, contents, address } = data;
    try {
      const result = await createSolplaceLog({
        variables: {
          createSolplaceLogInput: {
            title,
            contents,
            address,
          },
        },
      });
      webviewlog(result);
    } catch (error) {
      webviewlog(error);
    }
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
