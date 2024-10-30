'use client';

import Button from '@/app/_component/form/Button';
import UserInput from '@/app/_component/form/UserInput';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function page() {
  const [userLogin, setUserLogin] = useState({
    id: '',
    pw: '',
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const onChangeUserLogin = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setUserLogin((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await loginUser({
      variables: {
        email: userLogin.id,
        password: userLogin.pw,
      },
    });
    const accessToken = data.loginUser.accessToken;
    localStorage.setItem('accessToken', accessToken);
  };

  return (
    <form onSubmit={onSubmitLogin}>
      <UserInput
        type="text"
        id="id"
        onChange={onChangeUserLogin}
        required={!!userLogin.id}
      />
      <UserInput
        type="password"
        id="pw"
        onChange={onChangeUserLogin}
        required={!!userLogin.pw}
      />
      <Button style="primary" type="submit">
        로그인
      </Button>
      <Link href="/user/signup">회원가입</Link>
    </form>
  );
}
