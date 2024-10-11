"use client";
import Input from "@/components/input";
import PostSearchPopBtn from "@/components/postSearchPopBtn";
import ReactQuillBox from "@/components/reactQuillBox";
import ModalAlertBox from "@/components/ModalAlertBox";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";

import { useBoardWrite } from "@/components/board-write/hook";
import { IboardFormProps } from "@/components/board-write/types";
import { redirect } from "next/navigation";

export default function BoardWrite(props: IboardFormProps) {
  const { title, formType } = props;

  const {
    data,
    onBoardEdit,
    onBoardNew,
    errors,
    formResister,
    control,
    setValue,
    Controller,
    router,
    params,
    fileList,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChange,
    handlePreview,
    isModalOpen,
    setIsModalOpen,
    modalType,
  } = useBoardWrite(formType);

  // 모든 태그 및 개행문자를 제거한 문자열 반환
  // const removeTags = (str: string) => {
  //   return str.replace(/(<([^>]+)>)/gi, "").replace(/(\r\n\t|\n|\r\t)/gm, "");
  // };

  //! 에러메시지가 있을 경우 alert 후 페이지 이동 처리 필요
  // if (errors && data === null) return redirect("/boards");

  return (
    <>
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          {(data || formType !== "edit") && (
            <>
              <Controller
                name="writeName"
                control={control}
                rules={formResister.writeName}
                defaultValue={data?.fetchBoard.writer || ""}
                render={({ field }) => (
                  <Input
                    id="writeName"
                    title="작성자"
                    required
                    placeholder="작성자 명을 입력해 주세요."
                    type="text"
                    errormessage={errors?.writeName?.message}
                    {...(formType === "edit" && { readOnly: true })}
                    {...field}
                  />
                )}
              />
              <Controller
                name="writePassword"
                control={control}
                rules={formResister.writePassword}
                defaultValue={formType === "edit" ? "01234567" : ""}
                render={({ field }) => (
                  <Input
                    id="writePassword"
                    title="비밀번호"
                    required
                    placeholder="비밀번호를 입력해 주세요."
                    type="password"
                    errormessage={errors?.writePassword?.message}
                    {...(formType === "edit" && { readOnly: true })}
                    {...field}
                  />
                )}
              />
            </>
          )}
        </div>

        <hr className="my-10" />

        {(data || formType !== "edit") && (
          <>
            <Controller
              name="writeTitle"
              control={control}
              rules={formResister.writeTitle}
              defaultValue={data?.fetchBoard.title || ""}
              render={({ field }) => (
                <Input
                  id="writeTitle"
                  title="제목"
                  required
                  placeholder="제목을 입력해 주세요."
                  type="text"
                  errormessage={errors?.writeTitle?.message}
                  {...field}
                />
              )}
            />
            <hr className="my-10" />
            <Controller
              name="writeContents"
              control={control}
              defaultValue={data?.fetchBoard.contents || ""}
              rules={formResister.writeContents}
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
                  defaultValue={data?.fetchBoard.contents || ""}
                  onChange={(html) => {
                    field.onChange(html === "<p><br></p>" ? "" : html);
                  }}
                />
              )}
            />
          </>
        )}

        <div className="py-10" />
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end max-w-56">
            {(data || formType !== "edit") && (
              <Controller
                name="writeAddressPost"
                control={control}
                rules={formResister.writeAddressPost}
                defaultValue={data?.fetchBoard.boardAddress?.zipcode || ""}
                render={({ field }) => (
                  <Input
                    id="writeAddressPost"
                    title="주소"
                    placeholder="01234"
                    type="text"
                    errormessage={errors?.writeAddressPost?.message}
                    {...field}
                  />
                )}
              />
            )}
            <PostSearchPopBtn
              setaddress={(field, value) => setValue("writeAddress", value)}
              setzonecode={(field, value) =>
                setValue("writeAddressPost", value)
              }
              btnstyle="btn btn-outline"
            />
          </div>

          {(data || formType !== "edit") && (
            <>
              <Controller
                name="writeAddress"
                control={control}
                rules={formResister.writeAddress}
                defaultValue={data?.fetchBoard.boardAddress?.address || ""}
                render={({ field }) => (
                  <Input
                    id="writeAddress"
                    placeholder="주소"
                    type="text"
                    errormessage={errors?.writeAddress?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="writeAddressDetail"
                control={control}
                rules={formResister.writeAddressDetail}
                defaultValue={
                  data?.fetchBoard.boardAddress?.addressDetail || ""
                }
                render={({ field }) => (
                  <Input
                    id="writeAddressDetail"
                    placeholder="상세 주소를 입력해주세요"
                    type="text"
                    errormessage={errors?.writeAddressDetail?.message}
                    {...field}
                  />
                )}
              />
            </>
          )}
        </div>
        <hr className="my-10" />

        {(data || formType !== "edit") && (
          <>
            <Controller
              name="youtubeUrl"
              control={control}
              rules={formResister.youtubeUrl}
              defaultValue={data?.fetchBoard.youtubeUrl || ""}
              render={({ field }) => (
                <Input
                  id="youtubeUrl"
                  title="유투브 링크"
                  placeholder="링크를 입력해 주세요."
                  type="url"
                  errormessage={errors?.youtubeUrl?.message}
                  {...field}
                />
              )}
            />

            <hr className="my-10" />

            <Controller
              name="imgFiles"
              control={control}
              rules={formResister.imgFiles}
              render={({ field }) => (
                <>
                  <Upload
                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    {...field}
                  >
                    {fileList.length >= 8 ? null : (
                      <button
                        style={{ border: 0, background: "none" }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    )}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </>
              )}
            />
          </>
        )}

        {/* <div className="flex gap-4 items-end">
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
        </div> */}

        <div className="flex items-end justify-end gap-4 pt-10">
          <Button
            htmlType={formType === "edit" ? "button" : "reset"}
            size="large"
            // className="btn btn-outline"
            onClick={() =>
              formType === "edit" && router.push(`/boards/${params.boardId}`)
            }
          >
            취소
          </Button>

          <Button
            htmlType="submit"
            color="default"
            size="large"
            variant="solid"
            // className="btn btn-primary text-base-100 disabled:btn-disabled"
            value="등록하기"
            onClick={formType === "edit" ? onBoardEdit : onBoardNew}
            // disabled={!isValid || !isDirty}
          >
            {formType === "edit" ? "수정" : "등록"}하기
          </Button>
        </div>
      </form>
    </>
  );
}
