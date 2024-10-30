"use client";
import Input from "@/components/input";
import ReactQuillBox from "@/components/react-quill-box";
import { Controller } from "react-hook-form";
import TagInput from "@/components/tag-input";
import { Upload, Image, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProductWrite } from "@/components/product-write/hook";
import PostSearchPopBtn from "@/components/post-search-pop-btn";
import KaKaoMap from "@/components/kakao-map";

export default function ProductWrite({ isEdit }: { isEdit: boolean }) {
  const {
    handleChangeImg,
    createProductClick,
    updateProductClick,
    control,
    imgFileList,
    previewOpen,
    setPreviewImage,
    previewImage,
    errors,
    router,
    setValue,
    isValid,
    isDirty,
    setPreviewOpen,
    getValues,
    data,
    productId,
    setTags,
    tags,
    watch,
  } = useProductWrite();
  console.log("수정", data);

  if (data || !isEdit)
    return (
      <>
        <h3 className="text-2xl font-bold">
          {isEdit ? "상품 수정" : "상품 등록"}
        </h3>
        <div>
          <Input
            id="productName"
            title="상품명"
            type="text"
            placeholder="상품명을 입력해 주세요."
            errormessage={errors?.productName?.message}
            defaultValue={data?.name || ""}
            required
            control={control}
          />
          <hr className="my-10" />
          <Input
            id="productRemarks"
            control={control}
            title="한줄 요약"
            type="text"
            placeholder="상품을 한줄로 요약해 주세요"
            errormessage={errors?.productRemarks?.message}
            defaultValue={data?.remarks || ""}
            required
          />
          <hr className="my-10" />
          <Controller
            name="productContents"
            control={control}
            defaultValue={data?.contents || ""}
            rules={{ required: "필수 입력 사항입니다." }}
            render={({ field }) => (
              <ReactQuillBox
                id="productContents"
                title={
                  <div className="flex gap-1 pb-3">
                    내용 <span className="text-red-500">*</span>
                  </div>
                }
                readonly={false}
                placeholder="내용을 입력해 주세요."
                errormessage={errors?.productContents?.message}
                defaultValue={data?.contents || ""}
                onChange={(html) => {
                  field.onChange(html === "<p><br></p>" ? "" : html);
                }}
              />
            )}
          />
          <hr className="my-10" />
          <Input
            id="productPrice"
            control={control}
            title="판매 가격"
            type="number"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            errormessage={errors?.productPrice?.message}
            defaultValue={String(data?.price)}
            required
          />
          <hr className="my-10" />

          <TagInput title="태그 입력" setTags={setTags} tags={tags} />

          <hr className="my-10" />

          <div className="grid gap-10 grid-cols-[3fr_7fr]">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-end max-w-56">
                  {(data || !isEdit) && (
                    <Input
                      id="productAddressPost"
                      title="주소"
                      placeholder="01234"
                      type="text"
                      errormessage={errors?.productAddressPost?.message}
                      defaultValue={data?.travelproductAddress?.zipcode || ""}
                      control={control}
                    />
                  )}
                  <PostSearchPopBtn
                    setaddress={(_, value) => setValue("productAddress", value)}
                    setzonecode={(_, value) =>
                      setValue("productAddressPost", value)
                    }
                    setLat={(_, value) => setValue("productAddressLAT", value)}
                    setLng={(_, value) => setValue("productAddressLNG", value)}
                    addressKeyName="productAddress"
                    addressPostKeyName="productAddressPost"
                    addressLatKeyName="productAddressLAT"
                    addressLngKeyName="productAddressLNG"
                  />
                </div>

                <Input
                  id="productAddress"
                  placeholder="주소"
                  type="text"
                  errormessage={errors?.productAddress?.message}
                  defaultValue={data?.travelproductAddress?.address || ""}
                  control={control}
                />

                <Input
                  id="writeAddressDetail"
                  placeholder="상세 주소를 입력해주세요"
                  type="text"
                  errormessage={errors?.productAddressDetail?.message}
                  defaultValue={data?.travelproductAddress?.addressDetail || ""}
                  control={control}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  id="productAddressLAT"
                  title="위도"
                  type="number"
                  readOnly={true}
                  placeholder="주소를 먼저 입력해 주세요"
                  control={control}
                  defaultValue={String(
                    Number(data?.travelproductAddress?.lat) ?? 0
                  )}
                />
                <Input
                  id="productAddressLNG"
                  title="경도"
                  type="number"
                  readOnly={true}
                  placeholder="주소를 먼저 입력해 주세요"
                  control={control}
                  defaultValue={String(
                    Number(data?.travelproductAddress?.lng) ?? 0
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h5>상세 위치</h5>

              {(!isEdit && Number(watch("productAddressLAT")) > 0) ||
              (isEdit &&
                data?.travelproductAddress?.lat &&
                data?.travelproductAddress?.lng) ? (
                <KaKaoMap
                  lat={
                    isEdit
                      ? Number(data?.travelproductAddress?.lat)
                      : Number(getValues("productAddressLAT"))
                  }
                  lng={
                    isEdit
                      ? Number(data?.travelproductAddress?.lng)
                      : Number(getValues("productAddressLNG"))
                  }
                />
              ) : (
                <div className="bg-gray-100 rounded-lg w-full h-[312px] flex items-center justify-center">
                  주소를 먼저 입력해 주세요.
                </div>
              )}
            </div>
          </div>

          <hr className="my-10" />

          <div className="flex flex-col gap-2">
            <h5>사진 첨부</h5>
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
                    <div style={{ marginTop: 8 }}>사진 업로드</div>
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
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="default"
              variant="solid"
              onClick={() =>
                isEdit
                  ? router.push(`/products/${productId}`)
                  : router.push("/products")
              }
              size="large"
            >
              취소
            </Button>
            <Button
              type="primary"
              onClick={() =>
                isEdit ? updateProductClick() : createProductClick()
              }
              disabled={!isValid || !isDirty}
              size="large"
            >
              {isEdit ? "수정하기" : "등록하기"}
            </Button>
          </div>
        </div>
      </>
    );
}
