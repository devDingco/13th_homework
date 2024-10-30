import { useState, ChangeEvent } from 'react';

// 모든 필드가 채워졌는지 확인하는 함수
const areAllFieldsFilled = (fields: { [key: string]: string }): boolean => {
  return !Object.values(fields).includes('');
};

export function useForm(initialState: { [key: string]: string }) {
  const [formState, setFormState] = useState(initialState);
  const [isAllFilled, setIsAllFilled] = useState(
    areAllFieldsFilled(initialState)
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const updatedForm = { ...prev, [name]: value };
      setIsAllFilled(areAllFieldsFilled(updatedForm)); // 필드가 모두 입력되었는지 확인
      return updatedForm;
    });
  };

  return { formState, handleChangeInput, isAllFilled };
}
