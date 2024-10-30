'use client';

import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  remarks: string;
  contents: string;
  price: number;
};
const CREATE_TRAVEL_PRODUCT = gql`
  mutation createTravelproduct(
    $createTravelproductInput: CreateTravelproductInput!
  ) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      name
      remarks
      contents
      price
    }
  }
`;

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);

  const onSubmit: SubmitHandler<Inputs> = ({
    name,
    remarks,
    contents,
    price,
  }) => {
    createTravelproduct({
      variables: {
        createTravelproductInput: {
          name,
          remarks,
          contents,
          price: Number(price),
        },
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-y-2">
        <input
          className="border border-2 w-[200px]"
          {...register('name', { required: true })}
        />
        <input
          className="border border-2 w-[200px]"
          {...register('remarks', { required: true })}
        />
        <input
          className="border border-2 w-[200px]"
          {...register('contents', { required: true })}
        />
        <input
          type="number"
          className="border border-2 w-[200px]"
          {...register('price', { required: true })}
        />
        <button type="submit">제출</button>
      </form>
    </>
  );
}
