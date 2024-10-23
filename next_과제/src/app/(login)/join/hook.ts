"use client";
import { useForm } from "react-hook-form";
import { db } from "@/commons/settings/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export const useJoinPage = () => {
  const router = useRouter();
  const {
    control,
    getValues,
    formState: { errors, isValid, isDirty },
    setError,
    watch,
  } = useForm({
    mode: "onChange",
  });

  // 비밀번호 확인 일치 여부 체크
  control.register("joinPasswordConfirm", {
    validate: (value) => {
      if (value === watch("joinPassword")) {
        return true;
      } else {
        return "비밀번호가 일치하지 않습니다.";
      }
    },
  });

  // 이메일 중복 확인 함수
  const duplicateCheck = async () => {
    const { joinEmail } = getValues();
    // 1. db에서 user email 중복 확인
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const isDuplicate = querySnapshot.docs.some(
      (doc) => doc.data().email === joinEmail
    );

    // 1-1. 이메일 중복 시 에러 발생
    if (isDuplicate) {
      setError("joinEmail", {
        type: "required",
        message: "중복된 이메일입니다.",
      });
    } else {
      if (!errors.joinEmail && joinEmail !== "")
        setError("joinEmail", {
          type: "custom",
          message: "사용 가능한 이메일입니다.",
        });
    }
  };

  // 회원가입 제출 함수
  const joinSubmit = async () => {
    const { joinEmail, joinName, joinPassword } = getValues();

    // 1. 이메일 중복 확인과 비밀번호 확인을 통과했는지 확인
    if (!isValid || !isDirty) return;

    // 2. db에 회원 정보 저장
    await addDoc(collection(db, "users"), {
      email: joinEmail,
      name: joinName,
      password: await bcrypt.hash(joinPassword, 10), // 비밀번호 암호화하여 저장
    });
    // 회원가입 성공 시 로그인 페이지로 이동
    router.push("/login");
  };

  return {
    control,
    joinSubmit,
    duplicateCheck,
    errors,
    isValid,
    isDirty,
  };
};
