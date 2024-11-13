import FirebaseAPI, { CollectionList } from "@/commons/apis/firebase";
import { DocumentData } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useMyPlanWrite() {
  const params = useParams();
  const [plan, setPlan] = useState<DocumentData>({});

  const { fetchDocument } = FirebaseAPI();

  const getPlan = async () => {
    const result = await fetchDocument(
      CollectionList.plan,
      String(params.myapisid)
    );
    console.log(result);
    setPlan(result ?? {});
  };

  return {
    getPlan,
    plan,
  };
}
