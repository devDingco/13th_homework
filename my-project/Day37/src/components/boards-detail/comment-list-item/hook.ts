import { useState } from "react";

export default function useCommentListItem() {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onCancelEdit = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    setIsEdit,
    onClickEdit,
    onCancelEdit,
  };
}
