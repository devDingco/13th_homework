import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useMutation } from "@apollo/client";
import { CREATE_TRAVEL_PRODUCT } from "./queries";
import { successModal } from "@/utils/modal";
import { Address } from "react-daum-postcode";

const useProductsWirte = (props) => {
  const router = useRouter();
  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [isZipCodeModalOpen, setIsZipCodeModalOpen] = useState(false);
  const [lat, setLat] = useState(33.5563); // 기본 위도
  const [lng, setLng] = useState(126.79581); // 기본 경도
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);

  // 웹 에디터 입력 값 setValue해주기
  const onChangeContents = (value) => {
    console.log(value);
    methods.setValue("contents", value);
    methods.trigger("contents");
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
        // kakaomap에 보낼 위도, 경도 state
        setLng(result[0].road_address.x);
        setLat(result[0].road_address.y);
        // form input에 넣어줄 위도, 경도
        methods.setValue("lng", lng);
        methods.setValue("lat", lat);
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

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data) => {
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
    lat,
    lng,
    tags,
    inputTag,
    methods,
    onToggleZipCodeModal,
    handleCompleteZipcodeModal,
    onChangeContents,
    onChangeTag,
    addTag,
    removeTag,
    onClickSubmit,
  };
};

export default useProductsWirte;
