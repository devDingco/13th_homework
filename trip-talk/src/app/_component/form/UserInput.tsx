import React, { ChangeEvent } from 'react';

const INPUT_LABEL = {
  id: '아이디',
  name: '이름',
  pw: '비밀번호',
  checkPw: '비밀번호 확인',
};

type IdType = 'id' | 'name' | 'pw' | 'checkPw';

export default function UserInput({
  id,
  type,
  required = true,
  onChange,
}: {
  id: IdType;
  type: string;
  required?: boolean;
  onChange: (evnet: ChangeEvent<HTMLInputElement>, name: IdType) => void;
}) {
  return (
    <div className="flex">
      <label htmlFor="id">{INPUT_LABEL[id]}</label>
      <input
        type="text"
        id={id}
        onChange={(e) => onChange(e, id)}
        className={`border-2 ${required ? 'border-[black]' : 'border-[red]'}`}
      />
    </div>
  );
}
