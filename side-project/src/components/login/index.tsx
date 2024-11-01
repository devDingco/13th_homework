'use client';

import { FormProvider } from 'react-hook-form';
import useLogin from './hooks';
import { InputPassword, InputRoundedLarge } from '@/commons/ui/Input';
import { ButtonDefaultRounded, ButtonSoftLink } from '@/commons/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginComponent() {
  const { methods, onClickLogin } = useLogin();
  const router = useRouter();
  const [pwVisible, setPwVisible] = useState(false);
  return (
    <div className="container flex flex-col w-full max-w-sm">
      <span className="prose-large_font">로그인</span>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-10"
          action="#"
          onSubmit={methods.handleSubmit(onClickLogin)}
        >
          <p className="mb-1 mt-14 prose-small_font">이메일</p>
          <InputRoundedLarge
            keyname="email"
            type="email"
            placeholder="이메일을 입력해주세요."
          />
          <p className="mt-1 prose-small_font">
            {methods.formState.errors.email?.message}
          </p>
          <p className="mb-1 prose-small_font">비밀번호</p>
          <InputPassword
            keyname="password"
            placeholder="비밀번호를 입력해주세요."
            size="large"
            visibilityToggle={{
              visible: pwVisible,
              onVisibleChange: setPwVisible,
            }}
          />
          <p className="mt-1 prose-small_font">
            {methods.formState.errors.password?.message}
          </p>
          <ButtonDefaultRounded>로그인</ButtonDefaultRounded>
        </form>
      </FormProvider>
      <ButtonSoftLink onClick={() => router.push('/signup')}>
        회원가입
      </ButtonSoftLink>
    </div>
  );
}
