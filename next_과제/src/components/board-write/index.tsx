"use client";
import Input from "@/components/input";
import PostSearchPopBtn from "@/components/post-search-pop-btn";
import ReactQuillBox from "@/components/react-quill-box";
import ModalAlertBox from "@/components/modal-alert-box";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";

import { useBoardWrite } from "@/components/board-write/hook";

import { Controller } from "react-hook-form";

export default function BoardWrite({ isEdit }: { isEdit: boolean }) {
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
    isModalOpen,
    setIsModalOpen,
    modalType,
    // handleRemoveImg,
    imgFileList,
  } = useBoardWrite(isEdit);

  //! 에러메시지가 있을 경우 alert 후 페이지 이동 처리 필요
  console.log("수정할 데이터", data);

  return (
    <>
      {isModalOpen && (
        <ModalAlertBox type={modalType} setIsModalOpen={setIsModalOpen} />
      )}
      <h3 className="text-2xl font-bold">
        {isEdit ? "게시글 수정" : "게시글 등록"}
      </h3>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          {(data || !isEdit) && (
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
                {...(isEdit && { readOnly: true })}
              />

              <Input
                id="writePassword"
                title="비밀번호"
                required
                placeholder="비밀번호를 입력해 주세요."
                type="password"
                errormessage={errors?.writePassword?.message}
                defaultValue={isEdit ? "01234567" : ""}
                control={control}
                {...(isEdit && { readOnly: true })}
              />
            </>
          )}
        </div>

        <hr className="my-10" />

        {(data || !isEdit) && (
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
            {(data || isEdit) && (
              <Input
                id="writeAddressPost"
                title="주소"
                placeholder="01234"
                type="text"
                errormessage={errors?.writeAddressPost?.message}
                defaultValue={data?.fetchBoard.boardAddress?.zipcode || ""}
                control={control}
                readOnly
              />
            )}
            <PostSearchPopBtn
              setaddress={(field, value) => setValue("writeAddress", value)}
              setzonecode={(field, value) =>
                setValue("writeAddressPost", value)
              }
              addressKeyName="writeAddress"
              addressPostKeyName="writeAddressPost"
            />
          </div>

          {(data || !isEdit) && (
            <>
              <Input
                id="writeAddress"
                placeholder="주소"
                type="text"
                errormessage={errors?.writeAddress?.message}
                defaultValue={data?.fetchBoard.boardAddress?.address || ""}
                readOnly
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

        {(data || !isEdit) && (
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
            htmlType={isEdit ? "button" : "reset"}
            size="large"
            // className="btn btn-outline"
            onClick={() => isEdit && router.push(`/boards/${params.boardId}`)}
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
            onClick={isEdit ? onBoardEdit : onBoardNew}
            // disabled={!isValid || !isDirty}
          >
            {isEdit ? "수정" : "등록"}하기
          </Button>
        </div>
      </form>
    </>
  );
}
