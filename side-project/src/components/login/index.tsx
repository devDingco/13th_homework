'use client';

import useLogin from './hooks';

export default function LoginComponent() {
  const { handleChange, onClickLogin } = useLogin();
  return (
    <div>
      <input
        type="email"
        placeholder="이메일"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        onChange={handleChange}
      />
      <button onClick={onClickLogin}>로그인</button>
    </div>
  );
}
