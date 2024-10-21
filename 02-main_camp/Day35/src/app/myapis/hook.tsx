import { DocumentData } from "firebase/firestore";
import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { useState } from "react";

export default function usePlanPage() {
  const [plans, setPlans] = useState<DocumentData[]>([]);

  const { fetchDocument } = FirebaseAPI();

  const getPlan = async () => {
    const result = await fetchDocument(CollectionList.plan);
    setPlans(result);
  };

  return {
    getPlan,
    plans,
  };
}
