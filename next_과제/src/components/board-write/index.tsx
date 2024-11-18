"use client";
import Input from "@/components/input";
import PostSearchPopBtn from "@/components/post-search-pop-btn";
import ReactQuillBox from "@/components/react-quill-box";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import { useBoardWrite } from "@/components/board-write/hook";
import { FormProvider } from "react-hook-form";

export default function BoardWrite({ isEdit }: { isEdit: boolean }) {
  const {
    data,
    onBoardEdit,
    onBoardNew,
    router,
    params,
    previewImage,
    previewOpen,
    handlePreview,
    setPreviewImage,
    setPreviewOpen,
    handleChangeImg,
    imgFileList,
    onChangeWriteContents,
    methods,
    setAddress,
  } = useBoardWrite(isEdit);

  return (
    <>
      <h3 className="text-2xl font-bold">
        {isEdit ? "게시글 수정" : "게시글 등록"}
      </h3>
      <FormProvider {...methods}>
        <div className="flex justify-between gap-10 flex-nowrap">
          {(data || !isEdit) && (
            <>
              <Input
                id="writeName"
                title="작성자"
                required
                placeholder="작성자 명을 입력해 주세요."
                type="text"
                defaultValue={data?.fetchBoard.writer || ""}
                {...(isEdit && { readOnly: true })}
              />

              <Input
                id="writePassword"
                title="비밀번호"
                required
                placeholder="비밀번호를 입력해 주세요."
                type="password"
                defaultValue={isEdit ? "01234567" : ""}
                {...(isEdit && { readOnly: true })}
              />
            </>
          )}
        </div>

        <hr />

        {(data || !isEdit) && (
          <>
            <Input
              id="writeTitle"
              title="제목"
              required
              placeholder="제목을 입력해 주세요."
              type="text"
              defaultValue={data?.fetchBoard.title || ""}
            />
            <hr />

            <ReactQuillBox
              id="writeContents"
              title={
                <div className="flex gap-1 pb-3">
                  내용 <span className="text-red-500">*</span>
                </div>
              }
              readonly={false}
              placeholder="내용을 입력해 주세요."
              defaultValue={data?.fetchBoard.contents || ""}
              onChange={(html: string) => onChangeWriteContents(html)}
            />
          </>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end max-w-56">
            {(data || !isEdit) && (
              <Input
                id="writeAddressPost"
                title="주소"
                placeholder="01234"
                type="text"
                defaultValue={data?.fetchBoard.boardAddress?.zipcode || ""}
                readOnly
              />
            )}
            <PostSearchPopBtn
              setaddress={(value) => setAddress("writeAddress", value)}
              setzonecode={(value) => setAddress("writeAddressPost", value)}
            />
          </div>

          {(data || !isEdit) && (
            <>
              <Input
                id="writeAddress"
                placeholder="주소"
                type="text"
                defaultValue={data?.fetchBoard.boardAddress?.address || ""}
                readOnly
              />

              <Input
                id="writeAddressDetail"
                placeholder="상세 주소를 입력해주세요"
                type="text"
                defaultValue={
                  data?.fetchBoard.boardAddress?.addressDetail || ""
                }
              />
            </>
          )}
        </div>
        <hr />

        {(data || !isEdit) && (
          <>
            <Input
              id="youtubeUrl"
              title="유투브 링크"
              placeholder="링크를 입력해 주세요."
              type="url"
              defaultValue={data?.fetchBoard.youtubeUrl || ""}
            />
            <hr />
            {imgFileList && (
              <Upload
                listType="picture-card"
                accept="image/jpeg, image/png"
                fileList={imgFileList.map((file) => {
                  return file;
                })}
                onChange={handleChangeImg}
                onPreview={handlePreview}
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
      </FormProvider>
    </>
  );
}
