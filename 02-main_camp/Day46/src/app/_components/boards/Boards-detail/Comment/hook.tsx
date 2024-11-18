import { useState } from "react";

export default function useComment() {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickEdit = () => {
    toggleEditMode();
  };
  return { isEdit, onClickEdit, toggleEditMode };
}
