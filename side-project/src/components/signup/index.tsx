// SignUpComponent.js
'use client';

import { Button, Input } from 'antd';
import { useState } from 'react';
import useSignUp from './hooks';

export default function SignUpComponent() {
  const [pwVisible, setPwVisible] = useState(false);
  const [pwCheckVisible, setCheckVisible] = useState(false);
  const { onClickRegister, handleChangeInput, errorMsg, isActive } =
    useSignUp();

  return (
    <div className="container flex flex-col gap-3 w-full max-w-sm">
      <span className="prose-large_font">회원가입</span>
      <p className="text-center mb-6">
        회원가입을 위해 아래의 빈칸을 모두 채워주세요.
      </p>
      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p className="mb-1 prose-small_font">이메일</p>
          <Input
            placeholder="이메일을 입력해주세요."
            size="large"
            type="email"
            name="email"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <p className="mb-1 prose-small_font">이름</p>
          <Input
            placeholder="이름을 입력해주세요."
            size="large"
            type="text"
            name="name"
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <p className="mb-1 prose-small_font">비밀번호</p>
          <Input.Password
            className="mb-1"
            placeholder="비밀번호를 입력해주세요."
            visibilityToggle={{
              visible: pwVisible,
              onVisibleChange: setPwVisible,
            }}
            size="large"
            type="password"
            name="password"
            onChange={handleChangeInput}
          />
          <Input.Password
            placeholder="비밀번호를 다시 한번 입력해주세요."
            visibilityToggle={{
              visible: pwCheckVisible,
              onVisibleChange: setCheckVisible,
            }}
            size="large"
            type="password"
            name="confirmPassword"
            onChange={handleChangeInput}
          />
          <p className="mt-1 prose-error_font">{errorMsg ? errorMsg : ''}</p>
        </div>
        <Button
          disabled={!isActive}
          size="large"
          type="primary"
          className="py-3"
          onClick={onClickRegister}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
