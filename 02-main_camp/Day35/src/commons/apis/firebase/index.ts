import { db } from "@/commons/apis/firebase/config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export enum CollectionList {
  plan = "plan",
}

export default function FirebaseAPI() {
  const createDocument = async (
    name: CollectionList,
    index: number,
    data: object
  ) => {
    try {
      await setDoc(doc(db, name, String(index)), {
        ...data,
      });
      console.log(`${name} 문서 "생성" 성공`);
    } catch (error) {
      console.log(`${name} 문서 "생성" 실패: `, error);
    }
  };

  const fetchDocument = async (name: CollectionList) => {
    try {
      const documents = await getDocs(collection(db, name));
      const data = documents.docs.map((el) => el.data());
      console.log(`${name} 문서 "가져오기" 성공`);
      return data;
    } catch (error) {
      console.log(`${name} 문서 "가져오기" 실패: `, error);
    }
  };

  const updateDocument = async (
    name: CollectionList,
    index: number,
    updateValue: object
  ) => {
    try {
      const docRef = doc(db, name, String(index));
      await updateDoc(docRef, {
        updateValue,
      });
      console.log("문서 업데이트를 성공했습니다.");
    } catch (error) {
      console.error("문서 업데이트를 실패했습니다.:", error);
    }
  };

  return {
    createDocument,
    fetchDocument,
    updateDocument,
  };
}
