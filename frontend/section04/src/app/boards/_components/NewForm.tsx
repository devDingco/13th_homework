import React from "react";

interface NewFormProps {
  inputValue: {
    author: string;
    password: string;
    title: string;
    content: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
}

export default function NewForm({
  inputValue,
  onChange,
  onSubmit,
}: NewFormProps) {
  return (
    <div className="input-area">
      <input
        id="author"
        placeholder="작성자"
        value={inputValue.author}
        onChange={onChange}
      />
      <input
        id="password"
        placeholder="비밀번호"
        value={inputValue.password}
        onChange={onChange}
        type="password"
      />
      <input
        id="title"
        placeholder="제목"
        value={inputValue.title}
        onChange={onChange}
      />
      <textarea
        id="content"
        placeholder="내용"
        value={inputValue.content}
        onChange={onChange}
      />
      <button onClick={onSubmit}>완료</button>
    </div>
  );
}
