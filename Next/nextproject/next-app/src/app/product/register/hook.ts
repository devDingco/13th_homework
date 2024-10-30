"use client";

import { CreateTravelProduct } from "@/app/component/queires/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function UseProductRegister() {
  const { register, handleSubmit } = useForm();
  const [product] = useMutation(CreateTravelProduct);
  const router = useRouter();
  const onClickSubmit = async (data) => {
    const result = await product({
      variables: {
        createTravelproductInput: {
          name: data.name,
          price: Number(data.price),
          contents: data.contents,
          remarks: data.remarks,
        },
      },
    });
    router.push("../../product/detail");
    console.log(result);
  };
  return {
    register,
    handleSubmit,
    onClickSubmit,
  };
}
