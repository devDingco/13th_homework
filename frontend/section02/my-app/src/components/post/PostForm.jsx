import React from "react";
import InputFormText from "./InputFormText";

import Button from "./Button";

const PostForm = () => {
  return (
    <>
      <div className="input-area">
        <div className="id-pw-area">
          <InputFormText title={"author"} />
          <InputFormText title={"password"} />
        </div>
        <InputFormText title={"title"} />

        <InputFormText title={"content"} />
        {/* <InputForm title="address" />

      <InputForm title="youtube" /> */}
      </div>
      {/* <div className="button-area">
      <Button reg={true} value="취소" />
      <Button value="등록하기" />
    </div> */}
    </>
  );
};

export default PostForm;
