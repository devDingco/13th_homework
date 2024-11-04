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
import { Address } from "react-daum-postcode";
import { IPropsProduct } from "./types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { schema } from "./schema";

export default function UseProductRegister(props: IPropsProduct) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FETCHTRAVELPRODUCT, {
    variables: {
      travelproductId: params.travelproductId,
    },
  });
  const [zipcode, setZipcode] = useState(
    props.isEdit ? data?.fetchTravelproduct.travelproductAddress.zipcode : ""
  );
  const { register, handleSubmit, formState } = useForm();
  const [product] = useMutation(CreateTravelProduct);
  const [updateproduct] = useMutation(UPDATETRAVELPRODUCT);

  const onClickSubmit = async (data) => {
    try {
      const result = await product({
        variables: {
          createTravelproductInput: {
            name: data.name,
            price: Number(data.price),
            contents: data.contents,
            remarks: data.remarks,
            travelproductAddress: {
              zipcode,
              addressDetail: data.addressdetail,
            },
          },
        },
      });
      router.push(`../../product/${result.data?.createTravelproduct._id}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
          travelproductAddress: {
            zipcode,
            addressDetail: data.addressdetail,
          },
        },
      },
    });
    router.push(`../../product/${result.data?.updateTravelproduct._id}`);
  };

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleComplete = (data: Address) => {
    const { zonecode } = data;
    setZipcode(zonecode);

    onToggleModal();
  };

  return {
    register,
    handleSubmit,
    onClickSubmit,
    onClickUpdate,
    data,
    formState,
    handleComplete,
    isModalOpen,
    onToggleModal,
    zipcode,
    location,
  };
}
