import { useState } from "react";

export default function useCommentListItem() {
  // 수정하기 or 작성하기
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };
  const closeEdit = () => {
    setIsEdit(false);
  };

  return {
    isEdit,
    closeEdit,
    onClickEdit,
  };
}
