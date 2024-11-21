import {
  CreateTravelproductDocument,
  FetchTravelproductDocument,
  UpdateTravelproductDocument,
  UpdateTravelproductMutationVariables,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { checkValidationFile } from "@/commons/libraries/validation";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Address } from "react-daum-postcode";

export const useProductRegist = () => {
  const router = useRouter();
  const params = useParams();

  const [inputs, setInputs] = useState<{
    name: string;
    remarks: string;
    contents: string;
    tags: string[]; // tags를 string[]로 변경
  }>({
    name: "",
    remarks: "",
    contents: "",
    tags: [], // 초기값은 빈 배열
  });

  const [price, setPrice] = useState<number>();
  const [zipcode, setZipcode] = useState("");
  const [basicAddress, setBasicAddress] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>(["", "", ""]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [isActive, setIsActive] = useState(false);
  console.log("🚀 ~ useProductRegist ~ setIsActive:", setIsActive);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(Array(3).fill(false));
  const [isEdit, setIsEdit] = useState(false);
  console.log("🚀 ~ useProductRegist ~ setIsEdit:", setIsEdit);

  const [createTravelproduct] = useMutation(CreateTravelproductDocument);
  const [updateTravelproduct] = useMutation(UpdateTravelproductDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const { data } = useQuery(FetchTravelproductDocument, {
    variables: { travelproductId: params.travelproductId as string },
  });

  useEffect(() => {
    if (isEdit && data) {
      setInputs((prev) => ({
        ...prev,
        name: data.fetchTravelproduct.name || "",
        remarks: data.fetchTravelproduct.remarks || "",
        contents: data.fetchTravelproduct.contents || "",
        tags: data.fetchTravelproduct.tags || ["", "", ""],
      }));
      setPrice(data.fetchTravelproduct.price || Number(""));
      setZipcode(data.fetchTravelproduct?.travelproductAddress?.zipcode || "");
      setBasicAddress(
        data.fetchTravelproduct?.travelproductAddress?.address || ""
      );
      //   setDetailAddress(data.fetchTravelproduct?.travelproductAddress?.addressDetail || "");
      setImageUrl(data.fetchTravelproduct?.images || ["", "", ""]);
    }
  }, [isEdit, data]);

  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onClickSearchAddress = () => {
    setIsOpen((prev) => !prev);
  };

  const postcodeComplete = (data: Address) => {
    setZipcode(data.zonecode);
    setBasicAddress(data.address);
    onClickSearchAddress();
  };

  const onMouseHover = (index: number) => {
    const newHoverState = [...isHover];
    newHoverState[index] = true; // 해당 인덱스만 true로 설정
    setIsHover(newHoverState);
  };

  const onMouseNoneHover = (index: number) => {
    const newHoverState = [...isHover];
    newHoverState[index] = false; // 해당 인덱스만 false로 설정
    setIsHover(newHoverState);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // 배열로 들어오는 이유 : <input type="file" multiple /> 일 때, 여러개 드래그 가능
    event.stopPropagation();
    if (!event.target.files) return;
    const file = event.target.files?.[0];
    const id = event.target.id;

    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });

    const newImages = [...imageUrl];
    newImages[Number(id)] = result.data?.uploadFile.url ?? ""; // 기존 이미지들을 복사한 뒤, 추가로 올린 사진을 뒤에 덧붙여서 연결하기
    setImageUrl(newImages);
  };

  const onClickRemovePrevImg = (
    event: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    event.stopPropagation();

    const updatedImageUrls = [...imageUrl];
    updatedImageUrls[index] = ""; // 해당 인덱스의 이미지를 제거

    // 상태 업데이트
    setImageUrl(updatedImageUrls);
  };

  const fileRefArray = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // ref array 구조
  const onClickImage = (index: number) => {
    if (fileRefArray[index].current) {
      fileRefArray[index].current.click();
      // 해당 Input 요소 클릭
    }
  };

  const registButton = async () => {
    if (
      !inputs.name?.trim() ||
      !inputs.remarks?.trim() ||
      !inputs.contents?.trim() ||
      !price ||
      !zipcode?.trim() ||
      !basicAddress?.trim()
    ) {
      Modal.error({
        content: "필수 입력 값을 채워주세요.",
      });
      return;
    }

    try {
      const result = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            ...inputs,
            price: Number(price),
            travelproductAddress: {
              zipcode: zipcode,
              address: basicAddress,
              lat: Number(lat),
              lng: Number(lng),
            },
            images: imageUrl,
          },
        },
      });
      resetFormData();
      Modal.success({ content: "게시글 등록에 성공하였습니다." });
      router.push(`/boards/${result.data?.createTravelproduct._id}`);
    } catch (error) {
      console.log("🚀 ~ registButton ~ error:", error);
      Modal.error({ content: "에러가 발생하였습니다. 다시 시도해주세요." });
    }
  };

  // 유효성 검증을 if문 여러개 걸어서 했더니 데이터가 정상적으로 들어가지는데도 어디서 문제가 생겨 수정 기능이 작동하지 않는지 확인이 어려워서 유효성 체크를 필수적인 것만 하도록 간단하게 변경
  const onClickUpdate = async () => {
    // 입력값 유효성 체크: 수정에 필요한 필드가 모두 채워졌는지 확인
    if (
      !inputs.name?.trim() ||
      !inputs.remarks?.trim() ||
      !inputs.contents?.trim() ||
      !price ||
      !zipcode?.trim() ||
      !basicAddress?.trim()
    ) {
      Modal.error({
        content: "필수 입력 값을 채워주세요.",
      });
      return;
    }

    const myvariables: UpdateTravelproductMutationVariables = {
      travelproductId: String(params.travelproductId),
      updateTravelproductInput: {
        name: inputs.name.trim() || null,
        remarks: inputs.remarks.trim() || null,
        contents: inputs.contents.trim() || null,
        price: Number(price) || null,
        tags: inputs.tags || ["", "", ""],
        travelproductAddress: {
          zipcode: zipcode || null,
          address: basicAddress || null,
          lat: Number(lat) || null,
          lng: Number(lng) || null,
        },
        images: imageUrl || null,
      },
    };

    try {
      const result = await updateTravelproduct({ variables: myvariables });
      console.log("🚀 ~ onClickUpdate ~ result:", result);
      // 성공적으로 수정된 경우
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/boards/${result.data?.updateTravelproduct._id}`);
    } catch (error) {
      console.log("🚀 ~ onClickUpdate ~ error:", error);
      Modal.error({ content: "오류가 발생했습니다. 다시 시도해주세요." });
    }
  };

  function resetFormData() {
    // 폼 초기화
    setInputs({
      name: "",
      remarks: "",
      contents: "",
      tags: ["", "", ""],
    });
    setPrice(Number(""));
    setZipcode("");
    setBasicAddress("");
  }

  const cancelButton = () => {
    resetFormData();
    Modal.info({
      content: `${isEdit ? "수정" : "등록"}이 취소되었습니다.`,
      onOk: () => {
        router.push(`/boards/${params.travelproductId}`); // 확인 버튼 클릭 시 이동
      },
    });
  };

  const onChangeLAT = (event: ChangeEvent<HTMLInputElement>) => {
    setLat(event.target.value);
  };

  const onChangeLNG = (event: ChangeEvent<HTMLInputElement>) => {
    setLng(event.target.value);
  };

  return {
    onChangeInputs,
    registButton,
    onClickUpdate,
    cancelButton,
    onClickSearchAddress,
    postcodeComplete,
    isActive,
    isOpen,
    zipcode,
    basicAddress,
    inputs,
    onClickImage,
    onChangeFile,
    imageUrl,
    fileRefArray,
    isHover,
    onMouseHover,
    onMouseNoneHover,
    onClickRemovePrevImg,
    isEdit,
    onChangeLAT,
    onChangeLNG,
  };
};
