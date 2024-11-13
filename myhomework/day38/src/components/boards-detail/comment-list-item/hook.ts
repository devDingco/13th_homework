"use client";

import { useState } from "react";

export default function useCommentItem() {
  const [isEdit, setIsEdit] = useState(false);

  const isEditMode = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickEditComment = () => {
    isEditMode();
  };
  return { isEdit, onClickEditComment, isEditMode };
}
