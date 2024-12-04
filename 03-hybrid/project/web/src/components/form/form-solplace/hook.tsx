import { SAMPLE_DATA } from "@/app/solplace-logs/page";

import {
  SolPlaceLogsSchema,
  SolPlaceLogsType,
} from "@/schema/schema-solplace-logs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent } from "react";
import { useForm } from "react-hook-form";

export default function useFormSolplace() {
  const router = useRouter();
  const methods = useForm<SolPlaceLogsType>({
    resolver: zodResolver(SolPlaceLogsSchema),
  });
  const { setValue, watch, handleSubmit, control, formState } = methods;
  // const [uploadFile] = useMutation(UploadFileDocument);

  const uploadedImages = watch("images") || [];
  const reverseUploadImages = [...uploadedImages].reverse();

  const handleCreate = (data: SolPlaceLogsType) => {
    try {
      const result = {
        id: SAMPLE_DATA.length,
        images: data.images ?? [],
        name: data.name,
        contents: data.contents,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
      };
      SAMPLE_DATA.push(result);
      alert("솔플레이스 등록 완료!");
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file === undefined) return;

    try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        console.log(event.target?.result);
        if (typeof event.target?.result === "string")
          setValue(
            `images.${uploadedImages.length}`,
            event.target.result ?? "",
            { shouldDirty: true }
          );
      };
    } catch (error: unknown) {
      console.log("이미지 업로드를 실패했습니다.");
    }
  };

  const onClickDeleteImage = (
    event: MouseEvent<HTMLButtonElement>,
    deleteUrl: string
  ) => {
    event.stopPropagation();
    const index = uploadedImages.findIndex((url) => url === deleteUrl);
    if (index !== -1) {
      const updatedImages = [...uploadedImages];
      updatedImages.splice(index, 1);
      setValue("images", updatedImages, { shouldDirty: true }); // 업데이트된 배열 설정
    }
  };

  return {
    methods,
    reverseUploadImages,
    control,
    formState,
    handleSubmit,
    handleCreate,
    onChangeFile,
    onClickDeleteImage,
  };
}
