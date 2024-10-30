// useSignUp.js
import { CreateUserDocument } from '@/commons/gql/graphql';
import { useForm } from '@/commons/hooks/useForm';
import { useMutationHandler } from '@/commons/hooks/useMutationHandler';
import { ApolloError } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';

export default function useSignUp() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const { formState, handleChangeInput, isAllFilled } = useForm({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const createUser = useMutationHandler(CreateUserDocument);

  // 비밀번호 일치 여부
  useEffect(() => {
    const { password, confirmPassword } = formState;
    if (confirmPassword && password !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    } else {
      setErrorMsg('');
    }
  }, [formState.password, formState.confirmPassword]);

  // 회원가입 등록
  const onClickRegister = async () => {
    const { email, name, password } = formState;
    try {
      const result = await createUser({
        createUserInput: { email, name, password },
      });
      Modal.success({
        title: '성공',
        content: '환영합니다! 회원가입을 성공했습니다.',
        onOk() {
          router.push('/login');
        },
      });
    } catch (error) {
      let errorMessage = '회원가입에 실패하였습니다.';

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      Modal.error({
        title: '실패',
        content: errorMessage,
      });
    }
  };

  const isPasswordMatch = !errorMsg;
  const isActive = isAllFilled && isPasswordMatch;

  return {
    onClickRegister,
    handleChangeInput,
    errorMsg,
    isActive,
  };
}
