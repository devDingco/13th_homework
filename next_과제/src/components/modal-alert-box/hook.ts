"use client";
import { useModalStore } from "@/commons/stores/modal-store";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

export const useModalAlertBox = () => {
  const { isModal, setIsModal, removeModal } = useModalStore();
  const methods = useForm({
    mode: "onChange",
  });

  const isModalKeys = useMemo(() => Object.keys(isModal), [isModal]);

  return {
    isModal,
    setIsModal,
    removeModal,
    methods,
    isModalKeys,
  };
};
