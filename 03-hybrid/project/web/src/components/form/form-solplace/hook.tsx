import { UploadFileDocument } from "@/gql/graphql";
import {
  SolPlaceLogsSchema,
  SolPlaceLogsType,
} from "@/schema/schema-solplace-logs";
import { ApolloError, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

export default function useFormSolplace() {
  const methods = useForm<SolPlaceLogsType>({
    resolver: zodResolver(SolPlaceLogsSchema),
  });
  const { setValue, watch, handleSubmit, control, formState } = methods;
  const [uploadFile] = useMutation(UploadFileDocument);

  const uploadedImages = watch("images") || [];
  const reverseUploadImages = [...uploadedImages].reverse();

  console.log(uploadedImages);
  console.log(reverseUploadImages);

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

  return {
    methods,
    reverseUploadImages,
    control,
    formState,
    handleSubmit,
    onClickButton,
    onChangeFile,
  };
}
