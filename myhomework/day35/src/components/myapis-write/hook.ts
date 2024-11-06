"use client";

import { useState } from "react";
import { firebaseApp } from "@/commons/libraries/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { FormInstance, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import { IMyApisWrite } from "./types";

export default function useMyApisWrite(form: FormInstance, isEdit: boolean) {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState<IMyApisWrite>({
    id: "",
    writer: "",
    contents: "",
    title: "",
  });

  const isRegistCondition =
    data.writer !== "" && data.title !== "" && data.contents !== "";

  const onClickRegist = async () => {
    if (!isRegistCondition) {
      alert("작성자, 제목, 내용을 모두 입력해야 등록할 수 있습니다.");
      return;
    }

    try {
      const board = collection(getFirestore(firebaseApp), "board");
      const docRef = await addDoc(board, data);
      console.log("Doc ID: ", docRef.id);
      alert("등록이 완료되었습니다.");

      form.resetFields();
      setData({
        id: "",
        writer: "",
        title: "",
        contents: "",
      });
      router.push("/myapis");
    } catch (error) {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
      console.error("등록 에러:", error);
    }
  };

  const onClickUpdate = async () => {
    const documentId = Array.isArray(params.myapiId)
      ? params.myapiId[0]
      : params.myapiId;

    if (!documentId) {
      alert("유효한 문서 ID가 없습니다.");
      return;
    }

    try {
      const database = getFirestore(firebaseApp);
      const docRef = doc(database, "board", documentId);
      await updateDoc(docRef, data);
      alert("수정 완료되었습니다.");
      router.push("/myapis");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  const onChangeUpdateWriter = (newWriter: string) => {
    setData((prevData) => ({
      ...prevData,
      writer: newWriter,
    }));
  };

  const onChangeUpdateTitle = (newTitle: string) => {
    setData((prevData) => ({
      ...prevData,
      title: newTitle,
    }));
  };

  const onChangeUpdateContents = (newContents: string) => {
    setData((prevData) => ({
      ...prevData,
      contents: newContents,
    }));
  };

  const getPrevData = async () => {
    try {
      const documentId = params.myapiId;
      const database = getFirestore(firebaseApp);
      const docRef = doc(database, "board", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const singleData = docSnapshot.data() as IMyApisWrite;
        setData({ ...singleData });
        form.setFieldsValue(singleData);
        console.log("singleData: ", singleData);
      } else {
        console.log("데이터가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      alert("데이터 가져오기에 실패했습니다.");
    }
  };

  function resetFormData() {
    // 폼 초기화
    setData({
      id: "",
      writer: "",
      contents: "",
      title: "",
    });
  }

  const onClickCancel = () => {
    resetFormData();
    Modal.info({
      content: `${isEdit ? "수정" : "등록"}이 취소되었습니다.`,
      onOk: () => {
        router.push("/myapis"); // 확인 버튼 클릭 시 이동
      },
    });
  };

  return {
    data,
    setData,
    onClickRegist,
    onClickUpdate,
    onChangeUpdateWriter,
    onChangeUpdateTitle,
    onChangeUpdateContents,
    getPrevData,
    onClickCancel,
    isRegistCondition,
  };
}
