"use client";

import { ChangeEvent, useState } from "react";

export default function usePlaceNew() {
  const [formData, setFormData] = useState({
    이름: "",
    내용: "",
  });
  const disabled = !(formData.이름 && formData.내용);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return { handleChange, disabled };
}
