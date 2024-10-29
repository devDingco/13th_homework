"use client";
import { FETCHUSER } from "@/app/component/queires/queries";
import { useQuery } from "@apollo/client";

export const UseMyInfoPage = () => {
  const { data } = useQuery(FETCHUSER);

  return {
    data,
  };
};
