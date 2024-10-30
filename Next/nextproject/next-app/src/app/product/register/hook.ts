"use client";

import {
  CreateTravelProduct,
  FETCHTRAVELPRODUCT,
  UPDATETRAVELPRODUCT,
} from "@/app/component/queires/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function UseProductRegister() {
  const { register, handleSubmit } = useForm();
  const [product] = useMutation(CreateTravelProduct);
  const [updateproduct] = useMutation(UPDATETRAVELPRODUCT);
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FETCHTRAVELPRODUCT, {
    variables: {
      travelproductId: params.travelproductId,
    },
  });

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
    router.push(`../../product/${result.data?.createTravelproduct._id}`);
    console.log(result);
  };
  const onClickUpdate = async (data) => {
    const result = await updateproduct({
      variables: {
        travelproductId: params.travelproductId,
        updateTravelproductInput: {
          name: data.name,
          price: Number(data.price),
          contents: data.contents,
          remarks: data.remarks,
        },
      },
    });
    router.push(`../../product/${result.data?.updateTravelproduct._id}`);
  };

  return {
    register,
    handleSubmit,
    onClickSubmit,
    onClickUpdate,
    data,
  };
}
