import { useState } from 'react';

export default function useCommentListItem() {
  const [isEdit, setIsEdit] = useState(false);
  const onToggleEdit = () => {
    setIsEdit((_isEdit) => !_isEdit);
  };
  return {
    isEdit,
    setIsEdit,
    onToggleEdit,
  };
}
