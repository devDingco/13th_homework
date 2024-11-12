"use client";

import { InputField } from "../common/InputField";
import { AddressField } from "../common/AddressField";
import { gql, useMutation } from "@apollo/client";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const VALIDATE_NICKNAME = gql`
  mutation validateNickname($nickname: String!) {
    validateNickname(nickname: $nickname)
  }
`;

export default function BasicInfoStep() {
  const { watch, clearErrors } = useFormContext();

  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastCheckedNickname, setLastCheckedNickname] = useState("");

  // 현재 닉네임 값 감시
  const currentNickname = watch("nickname");

  // 닉네임 값이 변경될 때마다 실행되는 효과
  useEffect(() => {
    // 닉네임 빈값이거나 마지막으로 체크한 닉네임과 다른 경우
    if (!currentNickname || currentNickname !== lastCheckedNickname) {
      setIsAvailable(null); // 중복 체크 상태 초기화
    }
  }, [currentNickname, lastCheckedNickname, clearErrors]);

  const [validateNickname] = useMutation(VALIDATE_NICKNAME);

  // 닉네임 중복 체크
  const handleNicknameCheck = async () => {
    setIsChecking(true);

    try {
      const result = await validateNickname({
        variables: { nickname: currentNickname },
      });

      console.log("닉네임 중복 결과: ", result.data.validateNickname);

      // 에러가 발생하지 않으면 사용 가능한 닉네임
      setIsAvailable(true);
      setLastCheckedNickname(currentNickname);
      clearErrors("nickname");
    } catch (error) {
      // 중복된 닉네임인 경우
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  // 에러 메시지
  const renderStatusMessage = () => {
    // 중복 체크 결과가 있는 경우
    if (isAvailable !== null) {
      return isAvailable ? (
        <div className="flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">
            사용 가능한 닉네임입니다.
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-500">중복된 닉네임입니다.</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* 이름, 닉네임 */}
      <div className="grid grid-cols-2 gap-8">
        {/* 이름 입력 필드 */}
        <InputField
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          required
        />

        {/* 닉네임 입력 영역 */}
        <div className="relative">
          <div className="flex items-end gap-2">
            <InputField
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              required
            />

            {/* 중복 확인 버튼 */}
            <Button
              type="button"
              onClick={handleNicknameCheck}
              disabled={
                isChecking ||
                !currentNickname ||
                currentNickname === lastCheckedNickname
              }
              className="px-3 py-2 h-9 absolute top-5 right-1 hover:bg-indigo-600"
            >
              {isChecking ? "확인중..." : "중복확인"}
            </Button>
          </div>

          {/* 상태 메시지 */}
          <div className="absolute -bottom-6">{renderStatusMessage()}</div>
        </div>
      </div>

      {/* 이메일 */}
      <InputField
        name="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        required
      />

      {/* 비밀번호 */}
      <div className="space-y-4">
        <InputField
          name="password"
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          required
        />
        <InputField
          name="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          required
        />
      </div>

      {/* 주소 입력 */}
      <AddressField />
    </div>
  );
}
