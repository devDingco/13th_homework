import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useMutation } from "@apollo/client";
import { CREATE_TRAVEL_PRODUCT } from "./queries";
import { useForm } from "react-hook-form";
import { useState } from "react";

const useProductsWirte = (props) => {
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);

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
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tags,
    inputTag,
    methods,
    onChangeTag,
    addTag,
    removeTag,
    onClickSubmit,
  };
};

export default useProductsWirte;
