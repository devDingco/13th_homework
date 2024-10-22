import { DocumentData } from "firebase/firestore";
import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { useState } from "react";

export default function usePlanPage() {
  const [planList, setPlanList] = useState<DocumentData[]>([]);

  const { fetchDocument } = FirebaseAPI();

  const getPlanList = async () => {
    const result = await fetchDocument(CollectionList.plan);
    setPlanList(result ?? []);
  };

  return {
    planList,
    getPlanList,
  };
}
