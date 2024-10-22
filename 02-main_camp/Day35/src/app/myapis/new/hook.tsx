import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { db } from "@/commons/apis/firebase/config";
import { Modal } from "antd";
import { Dayjs } from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface IPlanInputType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  departureLocation: string;
  destination: string;
  timeline: string[];
}

export default function usePlanNewPage() {
  const router = useRouter();
  const [index, setIndex] = useState(1);
  const [plan, setPlan] = useState<IPlanInputType>({
    id: index,
    title: "",
    startDate: "",
    endDate: "",
    companions: [],
    departureLocation: "",
    destination: "",
    timeline: [],
  });
  const [isActive, setIsActive] = useState(true);

  const { createDocument } = FirebaseAPI();

  const initDocumentIndex = async (name: CollectionList) => {
    const documents = await getDocs(collection(db, name));
    if (documents.docs.length !== 0) {
      // 마지막 문서의 id 보다 +1 증가한 값을 새로 생성하는 문서의 인덱스로 사용한다.
      const index = Number(documents.docs[documents.docs.length - 1].id) + 1;
      setIndex(Number(index));
      // 처음 문서의 인덱스를 초기화하면서, 생성될 인덱스의 번호도 초기화해준다.
      setPlan((prev) => {
        return {
          ...prev,
          id: index,
        };
      });
    }
  };

  const onClickCreate = async () => {
    await createDocument(CollectionList.plan, index, plan);
    setIndex((prev) => prev + 1);
    showSuccessModal("일정을 등록했습니다.", () => {
      router.push("/myapis");
    });
    console.log(`변경된 인덱스: ${index}`);
  };

  const onClickCancel = () => {
    router.push("/myapis");
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const tagName = event.currentTarget.name;
    setPlan((prev) => {
      return {
        ...prev,
        [tagName]: value,
      };
    });
    console.log(value);
  };

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    datesString: [string, string]
  ) => {
    setPlan((prev) => {
      return {
        ...prev,
        startDate: datesString[0],
        endDate: datesString[1],
      };
    });
  };

  const showSuccessModal = (
    content: string,
    completionHandler?: () => void
  ) => {
    Modal.success({
      content: content,
      onOk: completionHandler,
    });
  };

  return {
    index,
    isActive,
    initDocumentIndex,
    onClickCreate,
    onClickCancel,
    onChangeInput,
    onChangeDate,
  };
}
