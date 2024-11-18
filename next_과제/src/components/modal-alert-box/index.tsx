"use client";

import { Button, Modal } from "antd";
import Input from "@/components/input";
import { useModalAlertBox } from "@/components/modal-alert-box/hook";
import {
  CheckCircleFilled,
  InfoCircleFilled,
  ExclamationCircleFilled,
  WarningFilled,
} from "@ant-design/icons";
import type { IModalTypeAndContents, IModalTypeName } from "./types";
import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function ModalAlertBox() {
  const router = useRouter();
  const { removeModal, isModal, setIsModal, methods, isModalKeys } =
    useModalAlertBox();

  const successIcon = (
    <CheckCircleFilled style={{ fontSize: "40px", color: "#1890ff" }} />
  );
  const errorIcon = (
    <ExclamationCircleFilled style={{ fontSize: "40px", color: "#faad14" }} />
  );
  const infoIcon = (
    <InfoCircleFilled style={{ fontSize: "40px", color: "#1890ff" }} />
  );
  const warningIcon = (
    <WarningFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
  );

  const modalTypeAndContents: IModalTypeAndContents<IModalTypeName> = useMemo(
    () => ({
      login_confirm: {
        contents: (
          <>
            <h3>
              로그인이 필요합니다.
              <br /> 로그인 페이지로 이동하시겠습니까?
            </h3>
            <Button
              size="large"
              variant="solid"
              color="primary"
              className="w-full"
              onClick={() => {
                removeModal("login_confirm");
                router.push("/login");
              }}
            >
              로그인하기
            </Button>
            <Button
              size="large"
              // varian
              color="default"
              className="w-full"
              onClick={() => {
                removeModal("login_confirm");
                router.back();
              }}
            >
              이전 페이지로 가기
            </Button>
          </>
        ),
        icon: infoIcon,
        customFooter: true,
      },
      login_check_stay: {
        contents: (
          <>
            <h3>
              로그인이 필요합니다.
              <br /> 로그인 페이지로 이동하시겠습니까?
            </h3>
            <Button
              size="large"
              variant="solid"
              color="primary"
              className="w-full"
              onClick={() => {
                removeModal("login_check_stay");
                router.push("/login");
              }}
            >
              로그인하기
            </Button>
            <Button
              size="large"
              // varian
              color="default"
              className="w-full"
              onClick={() => removeModal("login_check_stay")}
            >
              취소
            </Button>
          </>
        ),
        icon: infoIcon,
        customFooter: true,
      },
      delete_password_check: {
        contents: (
          <>
            <p>
              삭제하시려면
              <br /> 비밀번호를 입력해 주세요.
            </p>
            <FormProvider {...methods}>
              <Input
                id="deletePassword"
                type="password"
                defaultValue=""
                placeholder="비밀번호를 입력해 주세요."
              />
              <div className="flex gap-4 w-full">
                <Button
                  size="large"
                  variant="solid"
                  className="w-full"
                  onClick={() => {
                    methods.reset(); // 비밀번호 입력값 초기화
                    removeModal("delete_password_check"); // 비밀번호 확인 모달 닫기
                  }}
                >
                  취소
                </Button>
                <Button
                  size="large"
                  variant="solid"
                  color="primary"
                  className="w-full"
                  onClick={methods.handleSubmit(() => {
                    const value = methods.getValues("deletePassword");
                    console.log(value);
                    if (value !== "") {
                      const confirm = isModal.delete_password_check.confirm;
                      if (confirm) confirm(value); // 비밀번호 확인 함수 실행
                      methods.reset(); // 비밀번호 입력값 초기화
                    } else {
                      console.log("비밀번호를 입력해 주세요.");
                      setIsModal({
                        name: "required",
                        contents: "비밀번호를 입력해 주세요.",
                      });
                    }
                  })}
                >
                  확인
                </Button>
              </div>
            </FormProvider>
          </>
        ),
        icon: infoIcon,
        customFooter: true,
      },
      success: {
        contents: isModal.success?.contents,
        icon: successIcon,
      },
      required: {
        contents: isModal.required?.contents ?? "필수 입력값을 입력해 주세요.",
        icon: infoIcon,
      },
      error: {
        contents:
          isModal.error?.contents ?? "예상치 못한 오류가 발생하였습니다.",
        icon: errorIcon,
      },
      delete_check: {
        contents: (
          <>
            <h3>정말 삭제하시겠습니까?</h3>
            <div className="flex gap-3">
              <Button
                size="large"
                variant="solid"
                color="primary"
                className="w-full"
                onClick={() => {
                  const confirm = isModal.delete_confirm.confirm;
                  if (confirm) confirm(); // 삭제 처리 함수 실행
                }}
              >
                삭제하기
              </Button>
              <Button
                size="large"
                // varian
                color="default"
                className="w-full"
                onClick={() => removeModal("delete_check")}
              >
                취소
              </Button>
            </div>
          </>
        ),
        icon: infoIcon,
        customFooter: true,
      },
    }),
    []
  );

  return isModalKeys.map((modalName, index) => {
    const key = modalName as keyof IModalTypeAndContents<IModalTypeName>;
    if (Object.keys(isModal).length > 0)
      return (
        <Modal
          key={modalName + index}
          centered={true}
          open={true}
          onOk={() => !modalName.includes("_confirm") && removeModal(key)}
          onCancel={() => {
            removeModal(key);
            if (modalName.includes("_confirm")) {
              router.back();
            }
          }}
          footer={null}
          width={300}
        >
          <div className="flex flex-col gap-3 items-center">
            {modalTypeAndContents[key].icon}
            <div className="font-bold text-lg text-center flex flex-col gap-3 w-full">
              {modalTypeAndContents[key].contents}
            </div>
            {!modalTypeAndContents[key].customFooter ? (
              <Button
                size="large"
                variant="solid"
                color="primary"
                className="w-full"
                onClick={() => removeModal(key)}
              >
                확인
              </Button>
            ) : (
              modalTypeAndContents[key].customFooter
            )}
          </div>
        </Modal>
      );
  });
}
