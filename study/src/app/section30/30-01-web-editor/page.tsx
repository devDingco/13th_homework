"use client";

import ReactQuill from "react-quill";
import { Button } from "antd";
import "react-quill/dist/quill.snow.css";

export default function WebEditorPage() {
  const setValue = (value: string) => {
    console.log(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // form submit 시 새로고침 방지
    const { Modal } = await import("antd"); // Modal을 동적 임포트 - 필요할 때만 불러옴 code splitting
    Modal.success({ content: "등록 성공하였습니다" });
  };

  return (
    <div className="w-[500px]">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input type="text" />

        <input type="password" />

        <input type="text" />

        <ReactQuill
          id="contents"
          theme="snow"
          onChange={setValue}
          style={{ height: "200px", marginBottom: "50px" }}
        />

        <Button size="large" color="primary" variant="solid" htmlType="submit">
          등록
        </Button>
      </form>
    </div>
  );
}
