import React from "react";
import Input from "../components/input";
import TextArea from "../components/textarea";
import Main from "../layout/main";
// import { useForm, SubmitHandler } from "react-hook-form";

// type Inputs = {
//   example: string;
//   exampleRequired: string;
// };

const write = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isValid },
  // } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Main>
      <h1 className="text-2xl font-bold">게시글 등록</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <div className="flex justify-between gap-10 w-full">
          <Input
            id="writeName"
            title="작성자"
            required
            placeholder="작성자 명을 입력해 주세요."
            type="text"
          />
          <Input
            id="writePassword"
            title="비밀번호"
            required
            placeholder="비밀번호를 입력해 주세요."
            type="password"
          />
        </div>
        <hr className="my-10" />
        <Input
          id="writeTitle"
          title="제목"
          required
          placeholder="제목을 입력해 주세요."
          type="text"
        />
        <hr className="my-10" />
        <TextArea
          id="writeContent"
          title="내용"
          required
          placeholder="내용을 입력해 주세요."
        />
        <div className="my-10" />
        <div className="flex gap-2 items-end max-w-56">
          <Input
            id="writeAddress"
            title="주소"
            placeholder="01234"
            type="text"
          />
          <button className="whiteBtn">우편번호 검색</button>
        </div>
        <Input placeholder="주소를 입력해 주세요." type="text" />
        <Input placeholder="상세주소" type="text" />
        <hr className="my-10" />
        <Input
          title="유투브 링크"
          placeholder="링크를 입력해 주세요."
          type="url"
        />
        <hr className="my-10" />
        <Input
          title="사진 첨부"
          placeholder="클릭해서 사진 업로드"
          type="file"
          accept="image/*"
          uploadcount={3}
        />
        <div className="flex items-end justify-end gap-4 pt-10">
          <button type="reset" className="whiteBtn">
            취소
          </button>
          <button
            type="submit"
            className="blueBtn disabled:grayBtn"
            // disabled={isValid ? false : true}
          >
            등록하기
          </button>
        </div>
      </form>
    </Main>
  );
};

export default write;
