import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useMutation } from "@apollo/client";
import { CREATE_TRAVEL_PRODUCT } from "./queries";
import { successModal } from "@/utils/modal";
import { Address } from "react-daum-postcode";
import { UploadFileDocument } from "@/commons/graphql/graphql";
import { checkValidationFile } from "@/utils/validation-file";

const useProductsWirte = (props) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [uploadFile] = useMutation(UploadFileDocument);
  const [isZipCodeModalOpen, setIsZipCodeModalOpen] = useState(false);
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState(props.data?.fetchTravelproduct.tags || []);

  console.log("productsWrite", props.data);
  console.log("tags", props.data?.fetchTravelproduct.tags);
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    // defaultValues를 설정해줘야 이미지 사진 첨부하지 않고 등록하기 버튼 누르면 에러메세지 제대로 작동
    defaultValues: {
      name: "",
      remarks: "",
      contents: "",
      price: null,
      tags: [],
      zipcode: "",
      addressDetail: "",
      lat: null,
      lng: null,
      images: [],
    },
  });

  useEffect(() => {
    // props.data가 로딩된 후 초기값으로 설정
    if (props.data) {
      methods.reset({
        name: props.data.fetchTravelproduct.remarks || "",
        remarks: props.data.fetchTravelproduct?.remarks || "",
        contents: props.data.fetchTravelproduct?.contents || "",
        price: props.data.fetchTravelproduct?.price || null,
        tags: props.data.fetchTravelproduct?.tags || [],
        zipcode:
          props.data.fetchTravelproduct?.travelproductAddress?.zipcode || "",
        addressDetail:
          props.data.fetchTravelproduct?.travelproductAddress?.addressDetail ||
          "",
        lat: props.data.fetchTravelproduct?.travelproductAddress?.lat || null,
        lng: props.data.fetchTravelproduct?.travelproductAddress?.lng || null,
        images: props.data.fetchTravelproduct?.images || [],
      });
    }
  }, [props.data, methods]);

  // 웹 에디터 입력 값 setValue해주기
  const onChangeContents = (value) => {
    // 빈 콘텐츠의 경우 빈 문자열로 설정
    const sanitizedContent = ["<p><br></p>", "<div><br></div>"].includes(value)
      ? ""
      : value;

    // 값 설정 후 검증
    methods.setValue("contents", sanitizedContent);
    methods.trigger("contents"); // 검증 트리거
  };

  // zipcode modal 토글 함수
  const onToggleZipCodeModal = () => {
    setIsZipCodeModalOpen((prev) => !prev);
  };

  // 우편번호 검색 후 지도 클릭 시
  const handleCompleteZipcodeModal = (data: Address) => {
    methods.setValue("zipcode", data.zonecode);
    // 주소를 받아서 위도, 경도로 변환하기
    const address = data.address;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        methods.setValue("lng", result[0].road_address.x);
        methods.setValue("lat", result[0].road_address.y);
        methods.trigger(["zipcode", "lat", "lng"]);
      }
    };
    geocoder.addressSearch(address, callback);
    onToggleZipCodeModal(); // 모달 닫기
  };

  const onChangeTag = (event) => {
    setInputTag(event.target.value);
  };

  // 입력한 태그 tags state 배열에 넣어주기
  const addTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // !event.nativeEvent.isComposing => 입력이 완료 되었으면
      // keydown의 한글 중복 문제 해결!!
      if (inputTag.trim() !== "" && !event.nativeEvent.isComposing) {
        setTags((prev) => [...prev, `#${inputTag}`]);
        setInputTag(""); // 인풋 초기화
      }
    }
  };

  // 태그 삭제
  const removeTag = (removeId) => {
    console.log(removeId);
    setTags(tags.filter((_, index) => index !== removeId));
  };

  // file버튼 클릭해주기
  const onClickImage = () => {
    fileRef.current?.click();
  };

  const images = methods.watch("images");
  // 이미지업로드버튼 클릭 시
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    // 검증 실패시 OnChangeFile함수 즉시 종료
    const isValid = checkValidationFile(file);
    if (!isValid) return;

    const result = await uploadFile({ variables: { file } });

    const fileUrl = result?.data?.uploadFile?.url;
    if (!fileUrl) return;

    const currentImages = methods.getValues("images") || [];

    methods.setValue("images", [...currentImages, fileUrl]);
  };

  // delete버튼 클릭 시 이미지 미리보기 삭제
  const onClickDelete = (event: MouseEvent<HTMLImageElement>) => {
    const imageId = event.currentTarget.id;
    console.log("삭제할 이미지 아이디: ", imageId);
    // 이미지 삭제
    const deletedImage = images.filter((_, index) => index !== Number(imageId));
    methods.setValue("images", deletedImage);
  };

  const onClickSubmit = async (data) => {
    console.log(data);
    try {
      const result = await createTravelproduct({
        // TODO: 스프레드연산자써서 짧게 만들어주기
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: tags,
            travelproductAddress: {
              zipcode: data.zipcode,
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
            },
            images: data.images,
          },
        },
      });
      console.log(result);
      const navigationToDetail = () => {
        router.push(`/products/${result?.data?.createTravelproduct?._id}`);
      };
      successModal("서비스 등록 완료😊", navigationToDetail);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isZipCodeModalOpen,
    tags,
    inputTag,
    fileRef,
    images,
    methods,
    onToggleZipCodeModal,
    handleCompleteZipcodeModal,
    onChangeContents,
    onChangeTag,
    addTag,
    removeTag,
    onChangeFile,
    onClickImage,
    onClickDelete,
    onClickSubmit,
  };
};

export default useProductsWirte;
