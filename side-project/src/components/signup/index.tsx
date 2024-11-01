'use client';

import { Button, Input } from 'antd';
import { useState } from 'react';
import useSignUp from './hooks';
import { Controller } from 'react-hook-form';

export default function SignUpComponent() {
  const [pwVisible, setPwVisible] = useState(false);
  const [pwCheckVisible, setCheckVisible] = useState(false);
  const { onClickRegister, control, handleSubmit, formState } = useSignUp();

  return (
    <div className="container flex flex-col gap-3 w-full max-w-sm">
      <span className="prose-large_font">회원가입</span>
      <p className="text-center mb-6">
        회원가입을 위해 아래의 빈칸을 모두 채워주세요.
      </p>
      <form
        className="flex flex-col gap-10"
        action="#"
        onSubmit={handleSubmit(onClickRegister)}
      >
        <div>
          <p className="mb-1 prose-small_font">이메일</p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="이메일을 입력해주세요."
                size="large"
                type="email"
              />
            )}
          />
          <p className="mt-1 prose-error_font">
            {formState.errors.email?.message as string}
          </p>
        </div>
        <div>
          <p className="mb-1 prose-small_font">이름</p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="이름을 입력해주세요."
                size="large"
              />
            )}
          />
          <p className="mt-1 prose-error_font">
            {formState.errors.name?.message as string}
          </p>
        </div>
        <div>
          <p className="mb-1 prose-small_font">비밀번호</p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className="mb-1"
                placeholder="비밀번호를 입력해주세요."
                visibilityToggle={{
                  visible: pwVisible,
                  onVisibleChange: setPwVisible,
                }}
                size="large"
                type="password"
              />
            )}
          />
          <p className="mt-1 prose-error_font">
            {formState.errors.password?.message as string}
          </p>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                className="mb-1"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                visibilityToggle={{
                  visible: pwCheckVisible,
                  onVisibleChange: setCheckVisible,
                }}
                size="large"
                type="password"
              />
            )}
          />
          <p className="mt-1 prose-error_font">
            {formState.errors.confirmPassword?.message as string}
          </p>
        </div>
        <Button
          disabled={!formState.isValid}
          size="large"
          type="primary"
          className="py-3"
          htmlType="submit"
        >
          가입하기
        </Button>
      </form>
    </div>
  );
}
