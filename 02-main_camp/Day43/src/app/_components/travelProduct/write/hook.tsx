import {
  ITravelProductSchema,
  travelProductSchema,
} from "@/app/_schema/travelProductSchema";
import {
  CreateTravelProductDocument,
  FetchTravelproductDocument,
  FetchTravelproductQuery,
  UpdateTravelproductDocument,
} from "@/commons/gql/graphql";
import { NavigationPaths, useNavigate } from "@/commons/navigate";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

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

  const methods = useForm<ITravelProductSchema>({
    resolver: zodResolver(travelProductSchema),
    defaultValues: {
      tags: [],
      images: [],
    },
  });
  const errorMessages = methods.formState.errors;

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    console.log(file);
  };

  const onClickImage = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event);
  };

  const onClickDeleteImage = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  const onClickCancel = () => {
    console.log("취소 버튼을 눌렀습니다.");
  };

  const onClickSubmit = async (data: ITravelProductSchema) => {
    console.log("등록 버튼을 눌렀습니다.");
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
  };
}
