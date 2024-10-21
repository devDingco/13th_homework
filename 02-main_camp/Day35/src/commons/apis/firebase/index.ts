import { firebaseApp } from "@/commons/apis/firebase/config";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

export enum CollectionList {
  plan = "plan",
}

export default function FirebaseAPI() {
  const fetchCollection = (name: CollectionList) => {
    const data = collection(getFirestore(firebaseApp), name);
    return data;
  };

  const createDocument = async (name: CollectionList, data: object) => {
    const collection = fetchCollection(name);
    await addDoc(collection, {
      data,
    });
    alert("일정을 생성합니다.");
  };

  const fetchDocument = async (name: CollectionList) => {
    const collection = fetchCollection(name);
    const documents = await getDocs(collection);
    const data = documents.docs.map((el) => el.data());
    console.log(data);
    console.log("일정 문서를 가져옵니다.");
    return data;
  };

  return {
    createDocument,
    fetchDocument,
  };
}
