import ReactQuill from "react-quill-new";
import { useMutation } from "@apollo/client";
import { UploadFileDocument } from "@/commons/graphql/graphql";
import { validationImageFile } from "@/commons/libs/validation-image-file";
import { useFormContext } from "react-hook-form";

export const useReactQuillBox = () => {
  const { register, formState } = useFormContext();
  const [uploadFile] = useMutation(UploadFileDocument);

  // ! 이미지 핸들러
  const imageHandler = (ReactQuill: ReactQuill) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      const isValid = validationImageFile(file);
      if (!isValid) {
        return;
      }

      try {
        // 서버에 이미지 업로드
        const result = await uploadFile({
          variables: { file },
        });
        const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${result.data?.uploadFile.url}`;
        console.log(imageUrl);

        // 이미지 삽입
        const range = ReactQuill.editor?.getSelection() ?? { index: 0 };
        ReactQuill.editor?.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  return {
    imageHandler,
    register,
    formState,
  };
};
