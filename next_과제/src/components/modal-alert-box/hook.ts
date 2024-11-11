"use client";
import { useModalStore } from "@/commons/stores/modal-store";
import { useForm } from "react-hook-form";

export const useModalAlertBox = () => {
  const { isModal, setIsModal } = useModalStore();
  const methods = useForm({
    mode: "onChange",
  });

  const modalClose = () => {
    if (isModal.type !== "")
      setIsModal({
        type: isModal.type,
        isModalOpen: false,
      });
  };

  return {
    modalClose,
    isModal,
    setIsModal,
    methods,
  };
};
