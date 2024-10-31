'use client';

import Button from '@/app/_component/form/Button';
import Input from '@/app/_component/form/Input';
import UserInput from '@/app/_component/form/UserInput';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      email
      name
    }
  }
`;

export default function page() {
  const [userSignup, setUserSignup] = useState({
    id: '',
    name: '',
    pw: '',
    checkPw: '',
  });

  const [createUser] = useMutation(CREATE_USER);

  const onChangeUserSignup = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setUserSignup((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const onSubmitSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      variables: {
        createUserInput: {
          email: userSignup.id,
          name: userSignup.name,
          password: userSignup.pw,
        },
      },
    });
  };

  return (
    <form onSubmit={onSubmitSignup}>
      <UserInput
        type="text"
        id="id"
        onChange={onChangeUserSignup}
        required={!!userSignup.id}
      />
      <UserInput
        type="text"
        id="name"
        onChange={onChangeUserSignup}
        required={!!userSignup.name}
      />
      <UserInput
        type="password"
        id="pw"
        onChange={onChangeUserSignup}
        required={!!userSignup.pw}
      />
      <UserInput
        type="password"
        id="checkPw"
        onChange={onChangeUserSignup}
        required={!!userSignup.checkPw}
      />
      {userSignup.pw !== userSignup.checkPw && (
        <p>비밀번호가 일치하지 않습니다!</p>
      )}
      <Button
        style="primary"
        type="submit"
        disabled={
          !(
            !!userSignup.id &&
            !!userSignup.name &&
            !!userSignup.pw &&
            !!userSignup.checkPw &&
            userSignup.checkPw === userSignup.pw
          )
        }>
        로그인
      </Button>
      <Link href="/user/signup">회원가입</Link>
    </form>
  );
}
