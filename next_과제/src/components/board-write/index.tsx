"use client";
import Input from "@/components/input";
import PostSearchPopBtn from "@/components/postSearchPopBtn";
import ReactQuillBox from "@/components/reactQuillBox";

import { useBoardWrite } from "@/components/board-write/hook";
import { IboardFormProps } from "@/components/board-write/types";

export default function BoardWrite(props: IboardFormProps) {
  const { title, formType } = props;

  const {
    onBoardEdit,
    onBoardNew,
    register,
    data,
    errors,
    isValid,
    isDirty,
    dirtyFields,
    formResister,
    control,
    setValue,
    Controller,
    router,
    params,
  } = useBoardWrite();

  // 모든 태그 및 개행문자를 제거한 문자열 반환
  // const removeTags = (str: string) => {
  //   return str.replace(/(<([^>]+)>)/gi, "").replace(/(\r\n\t|\n|\r\t)/gm, "");
  // };

  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          <Input
            id="writeName"
            title="작성자"
            required
            placeholder="작성자 명을 입력해 주세요."
            type="text"
            {...register("writeName", formResister.writeName)}
            errormessage={errors?.writeName?.message}
            defaultValue={
              formType === "edit" ? data?.fetchBoard.writer || "" : ""
            }
            {...(formType === "edit" && { readOnly: true })}
          />

          <Input
            id="writePassword"
            title="비밀번호"
            required
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            {...register("writePassword", formResister.writePassword)}
            errormessage={errors?.writePassword?.message}
            defaultValue={""}
            {...(formType === "edit" && { readOnly: true })}
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
          defaultValue={formType === "edit" ? data?.fetchBoard.title : ""}
        />
        <hr className="my-10" />
        {(data || formType !== "edit") && (
          <Controller
            name="writeContents"
            control={control}
            defaultValue={data?.fetchBoard.contents}
            rules={{ required: "내용을 입력해 주세요." }}
            render={({ field }) => (
              <ReactQuillBox
                id="writeContents"
                title={
                  <div className="flex gap-1 pb-3">
                    내용 <span className="text-red-500">*</span>
                  </div>
                }
                readonly={false}
                placeholder="내용을 입력해 주세요."
                errormessage={errors?.writeContents?.message}
                {...field}
                onChange={(html) => {
                  field.onChange(html);
                  setValue("writeContents", html);
                }}
              />
            )}
          />
        )}

        <div className="py-10" />
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end max-w-56">
            <Input
              id="writeAddressPost"
              title="주소"
              placeholder="01234"
              type="text"
              {...register("writeAddressPost", formResister.writeAddressPost)}
              errormessage={errors?.writeAddressPost?.message}
              {...(formType === "edit" && { readOnly: true })}
              defaultValue={
                formType === "edit"
                  ? data?.fetchBoard.boardAddress?.zipcode || ""
                  : ""
              }
            />
            <PostSearchPopBtn
              setaddress={(field, value) => setValue("writeAddress", value)}
              setzonecode={(field, value) =>
                setValue("writeAddressPost", value)
              }
              btnstyle="btn btn-outline"
              {...(formType === "edit" && { readOnly: true })}
            />
          </div>
          <Input
            id="writeAddress"
            placeholder="주소"
            type="text"
            {...register("writeAddress", formResister.writeAddress)}
            errormessage={errors?.writeAddress?.message}
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={
              formType === "edit"
                ? data?.fetchBoard.boardAddress?.address || ""
                : ""
            }
          />
          <Input
            id="writeAddressDetail"
            placeholder="상세 주소를 입력해주세요"
            type="text"
            {...register("writeAddressDetail", formResister.writeAddressDetail)}
            errormessage={errors?.writeAddressDetail?.message}
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={
              formType === "edit"
                ? data?.fetchBoard.boardAddress?.addressDetail || ""
                : ""
            }
          />
        </div>
        <hr className="my-10" />
        <Input
          id="youtubeUrl"
          title="유투브 링크"
          placeholder="링크를 입력해 주세요."
          type="url"
          {...register("youtubeUrl", formResister.youtubeUrl)}
          errormessage={errors?.youtubeUrl?.message}
          {...(formType === "edit" && { readOnly: true })}
          defaultValue={
            formType === "edit" ? data?.fetchBoard.youtubeUrl || "" : ""
          }
        />
        <hr className="my-10" />
        <div className="flex gap-4 items-end">
          <Input
            title="사진 첨부"
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile1", formResister.imgFile1)}
            errormessage={errors?.imgFile1?.message}
            {...(formType === "edit" && { readOnly: true })}
            // defaultValue={
            //   formType === "edit"
            //     ? data?.fetchBoard.images?.[0] ?? undefined
            //     : undefined
            // }
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile2", formResister.imgFile2)}
            errormessage={errors?.imgFile2?.message}
            {...(formType === "edit" && { readOnly: true })}
            // defaultValue={
            //   formType === "edit"
            //     ? data?.fetchBoard.images?.[1] ?? undefined
            //     : undefined
            // }
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile3", formResister.imgFile3)}
            errormessage={errors?.imgFile3?.message}
            {...(formType === "edit" && { readOnly: true })}
            // defaultValue={
            //   formType === "edit"
            //     ? data?.fetchBoard.images?.[2] ?? undefined
            //     : undefined
            // }
          />
        </div>
        <div className="flex items-end justify-end gap-4 pt-10">
          <button
            type={formType === "edit" ? "button" : "reset"}
            className="btn btn-outline"
            onClick={() =>
              formType === "edit" && router.push(`/boards/${params.boardId}`)
            }
          >
            취소
          </button>

          <button
            type="submit"
            className="btn btn-primary text-base-100 disabled:btn-disabled"
            value="등록하기"
            onClick={formType === "edit" ? onBoardEdit : onBoardNew}
            // 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            // disabled={
            //   formType === "edit"
            //     ? // 수정 시 내용이나 제목이 변경된 경우만 버튼 활성화
            //       dirtyFields.writeContents === true ||
            //       dirtyFields.writeTitle === true
            //       ? false
            //       : true
            //     : !isValid || !isDirty // 등록 시 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            // }
          >
            {formType === "edit" ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </>
  );
}
