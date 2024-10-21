"use client";
import Input from "@/components/input";
import PostSearchPopBtn from "@/components/postSearchPopBtn";
import ReactQuillBox from "@/components/reactQuillBox";
import ModalAlertBox from "@/components/ModalAlertBox";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";

import { useBoardWrite } from "@/components/board-write/hook";
import { IboardFormProps } from "@/components/board-write/types";
import { Controller } from "react-hook-form";

export default function BoardWrite(props: IboardFormProps) {
  const { title, formType } = props;

  const {
    data,
    onBoardEdit,
    onBoardNew,
    errors,
    control,
    setValue,
    router,
    params,
    previewImage,
    previewOpen,
    setPreviewImage,
    setPreviewOpen,
    handleChangeImg,
    handlePreviewImg,
    isModalOpen,
    setIsModalOpen,
    modalType,
    // handleRemoveImg,
    imgFileList,
  } = useBoardWrite(formType);

  //! 에러메시지가 있을 경우 alert 후 페이지 이동 처리 필요
  console.log("수정할 데이터", data);

  return (
    <>
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}
      <h3 className="text-2xl font-bold">{title}</h3>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          {(data || formType !== "edit") && (
            <>
              <Input
                id="writeName"
                title="작성자"
                required
                placeholder="작성자 명을 입력해 주세요."
                type="text"
                errormessage={errors?.writeName?.message}
                defaultValue={data?.fetchBoard.writer || ""}
                control={control}
                {...(formType === "edit" && { readOnly: true })}
              />

              <Input
                id="writePassword"
                title="비밀번호"
                required
                placeholder="비밀번호를 입력해 주세요."
                type="password"
                errormessage={errors?.writePassword?.message}
                defaultValue={formType === "edit" ? "01234567" : ""}
                control={control}
                {...(formType === "edit" && { readOnly: true })}
              />
            </>
          )}
        </div>

        <hr className="my-10" />

        {(data || formType !== "edit") && (
          <>
            <Input
              id="writeTitle"
              title="제목"
              required
              placeholder="제목을 입력해 주세요."
              type="text"
              errormessage={errors?.writeTitle?.message}
              defaultValue={data?.fetchBoard.title || ""}
              control={control}
            />
            <hr className="my-10" />
            <Controller
              name="writeContents"
              control={control}
              defaultValue={data?.fetchBoard.contents || ""}
              rules={{ required: "필수 입력 사항입니다." }}
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
              <Input
                id="writeAddressPost"
                title="주소"
                placeholder="01234"
                type="text"
                errormessage={errors?.writeAddressPost?.message}
                defaultValue={data?.fetchBoard.boardAddress?.zipcode || ""}
                control={control}
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
              <Input
                id="writeAddress"
                placeholder="주소"
                type="text"
                errormessage={errors?.writeAddress?.message}
                defaultValue={data?.fetchBoard.boardAddress?.address || ""}
                control={control}
              />

              <Input
                id="writeAddressDetail"
                placeholder="상세 주소를 입력해주세요"
                type="text"
                errormessage={errors?.writeAddressDetail?.message}
                defaultValue={
                  data?.fetchBoard.boardAddress?.addressDetail || ""
                }
                control={control}
              />
            </>
          )}
        </div>
        <hr className="my-10" />

        {(data || formType !== "edit") && (
          <>
            <Input
              id="youtubeUrl"
              title="유투브 링크"
              placeholder="링크를 입력해 주세요."
              type="url"
              errormessage={errors?.youtubeUrl?.message}
              defaultValue={data?.fetchBoard.youtubeUrl || ""}
              control={control}
            />
            <hr className="my-10" />
            {imgFileList && (
              <Upload
                listType="picture-card"
                accept="image/jpeg, image/png"
                fileList={imgFileList.map((file) => ({
                  ...file,
                  url: `${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${file.url}`,
                }))}
                onChange={handleChangeImg}
              >
                {imgFileList.length >= 3 ? null : (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            )}

            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
                width={200}
                height={200}
                style={{ width: "100%", height: "100%" }}
                alt="preview"
              />
            )}
          </>
        )}

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
