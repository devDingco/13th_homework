import {
  ITravelProductSchema,
  travelProductSchema,
} from "@/app/_schema/travelProductSchema";
import {
  CreateTravelProductDocument,
  FetchTravelproductDocument,
  FetchTravelproductQuery,
  FetchTravelproductsDocument,
  UpdateTravelproductDocument,
  UploadFileDocument,
} from "@/commons/gql/graphql";
import { NavigationPaths, useNavigate } from "@/utils/navigate";
import { checkValidationImage } from "@/utils/validation";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Address } from "react-daum-postcode";
import { useForm } from "react-hook-form";

declare const window: Window & {
  kakao: any;
};

interface ITravelProductWriteProps {
  isEdit: boolean;
  id: string;
}

export default function useTravelProductWrite({
  isEdit,
  id,
}: ITravelProductWriteProps) {
  const navigate = useNavigate();
  const params = useParams();
  const fileRefs = useRef<HTMLInputElement[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const { data } = useQuery<FetchTravelproductQuery>(
    FetchTravelproductDocument,
    {
      variables: {
        travelproductId: String(params.travelProductId),
      },
    }
  );
  const [createTravelProduct] = useMutation(CreateTravelProductDocument);
  const [updateTravelProduct] = useMutation(UpdateTravelproductDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const methods = useForm<ITravelProductSchema>({
    resolver: zodResolver(travelProductSchema),
    defaultValues: {
      images: [],
      tags: [],
    },
  });
  const errorMessages = methods.formState.errors;
  const address = methods.watch("address");

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    if (!checkValidationImage(file)) return;

    const result = await uploadFile({
      variables: {
        file,
      },
    });
    const id = Number(event.target.id);
    methods.setValue(`images[${id}]`, result.data?.uploadFile.url ?? "", {
      shouldDirty: true,
    });
  };

  const onClickImage = (event: MouseEvent<HTMLDivElement>) => {
    const id = Number(event.currentTarget.id);
    fileRefs.current[id].click();
  };

  const onClickDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const id = Number(event.currentTarget.id);
    methods.setValue(`images[${id}]`, "", { shouldDirty: true });

    // 렌더링을 유발하기 위해서는 form 상태의 변경이 필요함. images를 다시 셋팅해줘야 한다.
    const currentValues = methods.getValues("images");
    methods.setValue("images", currentValues);
  };

  const onClickCancel = () => {
    console.log("취소 버튼을 눌렀습니다.");
    navigate(NavigationPaths.travelProduct, id);
  };

  const onClickSubmit = async (data: ITravelProductSchema) => {
    try {
      const result = await createTravelProduct({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
            tags: data.tags,
            travelproductAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
              lat: Number(data.lat),
              lng: Number(data.lng),
            },
            images: data.images,
          },
        },
        refetchQueries: [
          {
            query: FetchTravelproductsDocument,
          },
        ],
      });
      const id = result.data?.createTravelproduct._id;
      alert("여행 상품 등록 성공");
      navigate(NavigationPaths.travelProduct, id);
    } catch (error) {
      console.log(error);
    }
  };

  const numberFields = ["price", "lat", "lng"];
  const addressFields = ["zipcode", "address", "addressDetail", "lng", "lat"];

  const createUpdatedData = (data: ITravelProductSchema) => {
    const updatedFields = methods.formState.dirtyFields;

    const updatedData = Object.keys(updatedFields).reduce((acc, key) => {
      const value = data[key];

      if (addressFields.includes(key)) {
        acc.travelproductAddress = acc.travelProductAddress || {};
        acc.travelproductAddress[key] = numberFields.includes(key)
          ? Number(value)
          : value;
      } else {
        acc[key] = numberFields.includes(key) ? Number(value) : value;
      }

      return acc;
    }, {} as Record<string, any>);
    console.log(updatedData);
    return updatedData;
  };

  const onClickUpdate = async (data: ITravelProductSchema) => {
    const updatedData = createUpdatedData(data);

    try {
      await updateTravelProduct({
        variables: {
          updateTravelproductInput: updatedData,
          travelproductId: id,
        },
      });
      alert("데이터가 수정되었습니다.");
      navigate(NavigationPaths.travelProduct, id);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleZipcodeSelect = async (data: Address) => {
    methods.setValue("zipcode", data.zonecode, { shouldDirty: true });
    methods.setValue("address", data.address, { shouldDirty: true });
    closeModal();
  };

  useEffect(() => {
    if (isEdit && data?.fetchTravelproduct) {
      const fetchedData = data.fetchTravelproduct;
      const addressData = fetchedData?.travelproductAddress ?? {};

      const defaultValues: ITravelProductSchema = {
        name: fetchedData.name ?? "",
        remarks: fetchedData.remarks ?? "",
        price: String(fetchedData.price) ?? "",
        contents: fetchedData.contents ?? "",
        tags: fetchedData.tags ?? [],
        zipcode: addressData.zipcode ?? "",
        address: addressData.address ?? "",
        addressDetail: addressData.addressDetail ?? "",
        lng: String(addressData.lng) ?? "",
        lat: String(addressData.lat) ?? "",
        images: fetchedData.images ?? [],
      };

      methods.reset(defaultValues);
    }
  }, [data]);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(function () {
        const geocoder = new window.kakao.maps.services.Geocoder();
        const address = methods.getValues("address");

        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // 상태 업데이트
            methods.setValue("lat", String(result[0].y), { shouldDirty: true });
            methods.setValue("lng", String(result[0].x), { shouldDirty: true });
          }
        });
      });
    };
  }, [address]);

  return {
    methods,
    fileRefs,
    errorMessages,
    onChangeFile,
    onClickImage,
    onClickDeleteImage,
    onClickSubmit,
    onClickCancel,
    onClickUpdate,
    isAddressModalOpen,
    openModal,
    closeModal,
    handleZipcodeSelect,
  };
}
