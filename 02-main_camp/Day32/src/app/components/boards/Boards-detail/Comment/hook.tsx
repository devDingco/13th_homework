import { useState } from "react";

export default function useComment() {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
    console.log("편집 모드가 반전됩니다.:::", isEdit);
  };

  const onClickEdit = () => {
    toggleEditMode();
  };
  return { isEdit, onClickEdit, toggleEditMode };
}
