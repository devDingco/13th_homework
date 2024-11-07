"use client";

import { CreateBoardDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { Button } from "antd";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function NewBoardPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const valueChange = (value: string) => {
    console.log(value);
    // register로 등록하지 않고, 강제로 값을 넣어줄 때 사용
    setValue("contents", value === "<p><br></p>" ? "" : value);
    // onChange가 됐는지 안됐는지 react-hook-form에 알려주는 기능!!
    trigger("contents");
  };
  const [createBoard] = useMutation(CreateBoardDocument);

  const onSubmit = async (data) => {
    try {
      const result = await createBoard({
        variables: { createBoardInput: { ...data } },
      });
      console.log(result);

      const { Modal } = await import("antd");
      Modal.success({ content: "등록 성공하였습니다" });

      router.push(
        `/section30/30-02-web-editor-hook-form/${result.data?.createBoard._id}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[500px]">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border rounded-xl h-10 p-3"
          type="text"
          placeholder="writer"
          {...register("writer")}
        />

        <input
          className="border rounded-xl h-10 p-3"
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <input
          className="border rounded-xl h-10 p-3"
          type="text"
          placeholder="title"
          {...register("title")}
        />

        <ReactQuill
          id="contents"
          theme="snow"
          onChange={valueChange}
          style={{ height: "200px", marginBottom: "50px" }}
          {...register("contents")}
        />

        <Button size="large" color="primary" variant="solid" htmlType="submit">
          등록
        </Button>
      </form>
    </div>
  );
}
