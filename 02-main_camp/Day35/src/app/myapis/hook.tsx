import { DocumentData } from "firebase/firestore";
import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { useState } from "react";

export default function usePlanPage() {
  const [planList, setPlanList] = useState<DocumentData[]>([]);

  const { fetchDocuments } = FirebaseAPI();

  const getPlanList = async () => {
    const result = await fetchDocuments(CollectionList.plan);
    // 생성된 순서대로 조회하기 위해서 id 내림차순으로 정렬
    result?.sort((a, b) => Number(b.id) - Number(a.id));
    setPlanList(result ?? []);
  };

  return {
    planList,
    getPlanList,
  };
}
