"use client";
import Input from "@/components/input";
import ReactQuillBox from "@/components/react-quill-box";
import TagInput from "@/components/tag-input";
import { Upload, Image, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProductWrite } from "@/components/product-write/hook";
import PostSearchPopBtn from "@/components/post-search-pop-btn";
import KaKaoMap from "@/components/kakao-map";
import { FormProvider } from "react-hook-form";

export default function ProductWrite({ isEdit }: { isEdit: boolean }) {
  const {
    handleChangeImg,
    createProductClick,
    updateProductClick,
    methods,
    onChangeProductContents,
    imgFileList,
    previewOpen,
    setPreviewImage,
    previewImage,
    router,
    setPreviewOpen,
    data,
    productId,
    setTags,
    tags,
    setAddress,
  } = useProductWrite();
  console.log("수정", data);

  if (data || !isEdit)
    return (
      <FormProvider {...methods}>
        <h3 className="text-2xl font-bold">
          {isEdit ? "상품 수정" : "상품 등록"}
        </h3>
        <div>
          <Input
            id="productName"
            title="상품명"
            type="text"
            placeholder="상품명을 입력해 주세요."
            defaultValue={data?.name || ""}
            required
          />
          <hr className="my-10" />
          <Input
            id="productRemarks"
            title="한줄 요약"
            type="text"
            placeholder="상품을 한줄로 요약해 주세요"
            defaultValue={data?.remarks || ""}
            required
          />
          <hr className="my-10" />
          <ReactQuillBox
            id="productContents"
            title={
              <div className="flex gap-1 pb-3">
                내용 <span className="text-red-500">*</span>
              </div>
            }
            readonly={false}
            placeholder="내용을 입력해 주세요."
            defaultValue={data?.contents || ""}
            onChange={(html: string) => onChangeProductContents(html)}
          />

          <hr className="my-10" />
          <Input
            id="productPrice"
            title="판매 가격"
            type="number"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
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
                      defaultValue={data?.travelproductAddress?.zipcode || ""}
                      readOnly
                    />
                  )}
                  <PostSearchPopBtn
                    setaddress={(value) => setAddress("productAddress", value)}
                    setzonecode={(value) =>
                      setAddress("productAddressPost", value)
                    }
                    setLat={(value) => setAddress("productAddressLAT", value)}
                    setLng={(value) => setAddress("productAddressLNG", value)}
                  />
                </div>

                <Input
                  id="productAddress"
                  placeholder="주소"
                  type="text"
                  defaultValue={data?.travelproductAddress?.address || ""}
                  readOnly
                />

                <Input
                  id="writeAddressDetail"
                  placeholder="상세 주소를 입력해주세요"
                  type="text"
                  defaultValue={data?.travelproductAddress?.addressDetail || ""}
                />
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  id="productAddressLAT"
                  title="위도"
                  type="number"
                  readOnly={true}
                  placeholder="주소를 먼저 입력해 주세요"
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
                  defaultValue={String(
                    Number(data?.travelproductAddress?.lng) ?? 0
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h5>상세 위치</h5>

              {(!isEdit && Number(methods.watch("productAddressLAT")) > 0) ||
              (isEdit &&
                data?.travelproductAddress?.lat &&
                data?.travelproductAddress?.lng) ? (
                <KaKaoMap
                  lat={
                    isEdit
                      ? Number(data?.travelproductAddress?.lat)
                      : Number(methods.getValues("productAddressLAT"))
                  }
                  lng={
                    isEdit
                      ? Number(data?.travelproductAddress?.lng)
                      : Number(methods.getValues("productAddressLNG"))
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
              disabled={
                !methods.formState.isValid || !methods.formState.isDirty
              }
              size="large"
            >
              {isEdit ? "수정하기" : "등록하기"}
            </Button>
          </div>
        </div>
      </FormProvider>
    );
}
