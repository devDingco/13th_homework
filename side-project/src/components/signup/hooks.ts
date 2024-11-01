import { ApolloError } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/registerSchema';
import { IRegisterForm } from './types';
import { useCreateUserMutation } from '@/graphql/mutations/createUser/createUser.generated';

export default function useSignUp() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const [createUser] = useCreateUserMutation();

  // 회원가입 등록
  const onClickRegister = async (data: IRegisterForm) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });
      console.log(result, '등록');
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

  return {
    onClickRegister,
    control,
    handleSubmit,
    formState,
  };
}
