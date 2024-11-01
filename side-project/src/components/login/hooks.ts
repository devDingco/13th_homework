import { useAccessTokenStore } from '@/commons/stores/accessToken';
import { useLoginUserMutation } from '@/graphql/mutations/loginUser/loginUser.generated';
import { ILoginType, loginSchema } from '@/schemas/loginSchema';
import { ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useLogin() {
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();
  const methods = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });
  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async (data: ILoginType) => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(result, '로그인 결과');

      if (result?.data?.loginUser?.accessToken) {
        const accessToken = result.data.loginUser.accessToken;

        setAccessToken(accessToken);
        console.log(accessToken, 'token 값');

        Modal.success({
          title: '로그인 성공',
          content: '로그인 성공',
          onOk() {
            // 추후 페이지 이동
            // router.push('/');
          },
        });
      } else {
        // console.log('토큰없음. 로그인실패');
        Modal.error({
          title: '실패',
          content: '이메일 혹은 비밀번호가 다릅니다.',
          onOk() {},
        });
      }
    } catch (error) {
      let errorMessage = '로그인에 실패했습니다.';
      if (error instanceof ApolloError && error.message) {
        errorMessage = error.message;
      }
      Modal.error({
        title: '오류',
        content: errorMessage,
      });
    }
  };
  return { methods, onClickLogin };
}
