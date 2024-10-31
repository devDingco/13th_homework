// import { LoginUserDocument } from '@/commons/gql/graphql';
import { useAccessTokenStore } from '@/commons/stores/accessToken';
import { useLoginUserMutation } from '@/graphql/mutations/loginUser/loginUser.generated';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useLogin() {
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const { setAccessToken } = useAccessTokenStore();

  const onClickLogin = async () => {
    const { email, password } = formState;

    try {
      const result = await loginUser({
        variables: { email, password },
      });
      console.log(result, '로그인 결과');

      if (result?.data?.loginUser?.accessToken) {
        const accessToken = result.data.loginUser.accessToken;

        setAccessToken(accessToken);
        // console.log(accessToken, 'token 값');

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
      console.log('로그인 중 오류 발생', error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return { handleChange, onClickLogin };
}
