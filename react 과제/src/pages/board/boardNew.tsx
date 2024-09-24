import Input from "components/input";
import TextArea from "components/textarea";
import Main from "layout/main";
import { useForm } from "react-hook-form";
import type { formList } from "hooks/useformset";
import { formResister } from "hooks/useformset";
import PostSearchPopBtn from "components/postSearchPopBtn";
import { useState } from "react";
import ReactQuillBox from "components/reactQuillBox";

const BoardNew = () => {
  const {
    register, // 검증 규칙 적용 메서드
    // handleSubmit, // 폼 제출 핸들러
    watch, // 입력값을 모니터링하는 메서드
    // setError, // 에러 메시지 설정 메서드
    setValue, // 입력값 설정 메서드
    formState: { errors, isDirty, isValid }, // 폼의 상태를 나타내는 속성
    // getValues, // 폼의 입력값을 반환하는 메서드
  } = useForm<formList>({ mode: "onChange" }); // 어떤 이벤트에 동작을 하도록 할지 설정

  const [zoneCode, setZoneCode] = useState(""); // 유저 우편번호
  const [address, setAddress] = useState(""); // 유저 주소

  const [contents, setContents] = useState({ text: "", html: "" });

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("게시글 등록");

    // Object.entries(formResister)
    //   .filter(
    //     ([key, value]) =>
    //       value.required && watch(key as keyof formList) !== undefined
    //   )
    //   .forEach(([key, value]) => {
    //     if (watch(key as keyof formList) === "")
    //       setError(key as keyof formList, {
    //         type: "required",
    //         message: value.required,
    //       });
    //   });
    // if (!isValid) {
    //   console.log("유효성 검사 실패");
    // } else {
    //   alert("게시글이 등록되었습니다.");
    // }
  };

  return (
    <Main>
      <h1 className="text-2xl font-bold">게시글 등록</h1>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          <Input
            id="writeName"
            title="작성자"
            // required
            placeholder="작성자 명을 입력해 주세요."
            type="text"
            {...register("writeName", formResister.writeName)}
            errormessage={errors?.writeName?.message}
          />
          <Input
            id="writePassword"
            title="비밀번호"
            required
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            {...register("writePassword", formResister.writePassword)}
            errormessage={errors?.writePassword?.message}
          />
        </div>
        <hr className="my-10" />
        <Input
          id="writeTitle"
          title="제목"
          required
          placeholder="제목을 입력해 주세요."
          type="text"
          {...register("writeTitle", formResister.writeTitle)}
          errormessage={errors?.writeTitle?.message}
        />
        <hr className="my-10" />
        <ReactQuillBox
          title={
            <div className="flex gap-1 pb-3">
              내용 <span className="text-red-500">*</span>
            </div>
          }
          id="writeContent"
          contents={contents}
          setcontents={setContents}
          onChange={(text) => {
            register("writeContent", formResister.writeContent);
            setValue("writeContent", text);
            console.log(watch("writeContent")); // !입력값 확인 버튼 활성화 관련 점검 필요
          }}
          readonly={false}
          placeholder="내용을 입력해 주세요."
          errormessage={errors?.writeContent?.message}
        />
        {/* <TextArea
          id="writeContent"
          title="내용"
          required
          placeholder="내용을 입력해 주세요."
          {...register("writeContent", formResister.writeContent)}
          errormessage={errors?.writeContent?.message}
        /> */}
        <div className="py-10" />
        <div className="flex gap-2 items-end max-w-56">
          <Input
            id="writeAddressPost"
            title="주소"
            placeholder="01234"
            type="text"
            {...register("writeAddressPost", formResister.writeAddressPost)}
            errormessage={errors?.writeAddressPost?.message}
            value={zoneCode}
          />
          <PostSearchPopBtn
            setAddress={setAddress}
            setZoneCode={setZoneCode}
            btnstyle="btn btn-outline"
          />
        </div>
        <Input
          id="writeAddress"
          placeholder="주소"
          type="text"
          {...register("writeAddress", formResister.writeAddress)}
          errormessage={errors?.writeAddress?.message}
          value={address}
        />
        <Input
          id="writeAddressDetail"
          placeholder="상세 주소를 입력해주세요"
          type="text"
          {...register("writeAddressDetail", formResister.writeAddressDetail)}
          errormessage={errors?.writeAddressDetail?.message}
        />
        <hr className="my-10" />
        <Input
          id="youtubeUrl"
          title="유투브 링크"
          placeholder="링크를 입력해 주세요."
          type="url"
          {...register("youtubeUrl", formResister.youtubeUrl)}
          errormessage={errors?.youtubeUrl?.message}
        />
        <hr className="my-10" />
        <Input
          title="사진 첨부"
          placeholder="클릭해서 사진 업로드"
          type="file"
          accept="image/*"
          uploadcount={3}
          {...register("imgFile", formResister.imgFile)}
          errormessage={errors?.imgFile?.message}
        />
        <div className="flex items-end justify-end gap-4 pt-10">
          <button type="reset" className="btn btn-outline">
            취소
          </button>

          <button
            type="submit"
            className="btn btn-primary disabled:btn-disabled"
            value="등록하기"
            onClick={(event) => onSubmit(event)}
            // 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            disabled={!isDirty || !isValid}
          >
            등록하기
          </button>
        </div>
      </form>
    </Main>
  );
};

export default BoardNew;
