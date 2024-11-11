"use client";

import { Button, InputRef, Modal } from "antd";
import Input from "@/components/input";
import { useModalAlertBox } from "@/components/modal-alert-box/hook";
import {
  CheckCircleFilled,
  InfoCircleFilled,
  ExclamationCircleFilled,
  WarningFilled,
} from "@ant-design/icons";
import { IModalTypeAndContents } from "./types";
import { useEffect, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { set } from "lodash";

export default function ModalAlertBox() {
  const { modalClose, isModal, methods, setIsModal } = useModalAlertBox();

  const successIcon = (
    <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
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

  useEffect(() => {
    if (isModal.type === "commentDeletePasswordCheck") {
      methods.setFocus("commentDeletePassword");
    }
  }, [isModal.isModalOpen]);

  const modalTypeAndContents: IModalTypeAndContents = useMemo(
    () => ({
      commentDeletePasswordCheck: {
        contents: (
          <>
            <p>
              댓글을 삭제하시려면
              <br /> 비밀번호를 입력해 주세요.
            </p>
            <FormProvider {...methods}>
              <Input
                id="commentDeletePassword"
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
                    modalClose();
                    methods.reset(); // 비밀번호 입력값 초기화
                  }}
                >
                  취소
                </Button>
                <Button
                  size="large"
                  variant="solid"
                  color="primary"
                  className="w-full"
                  onClick={() =>
                    methods.handleSubmit(() => {
                      const value = methods.getValues("commentDeletePassword");
                      if (value !== "") {
                        isModal.confirm?.(value);
                        methods.reset(); // 비밀번호 입력값 초기화
                      } else {
                        console.log("비밀번호를 입력해 주세요.");
                        setIsModal({ type: "commentEditPasswordRequired" });
                      }
                      // modalClose();
                    })()
                  }
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
      commentNewSubmit: {
        contents: "댓글 등록이 완료되었습니다.",
        icon: successIcon,
      },
      commentEditSubmit: {
        contents: "댓글 수정이 완료되었습니다.",
        icon: successIcon,
      },
      deleteCommentSuccess: {
        contents: "댓글 삭제가 완료되었습니다.",
        icon: successIcon,
      },
      commentEditPasswordRequired: {
        contents: "비밀번호를 입력해 주세요.",
        icon: errorIcon,
      },
      commentEditPasswordError: {
        contents: "비밀번호가 일치하지 않습니다.",
        icon: errorIcon,
      },
      boardEditSubmit: {
        contents: "게시글 수정이 완료되었습니다.",
        icon: successIcon,
      },
      boardEditPasswordError: {
        contents: "비밀번호가 일치하지 않습니다.",
        icon: errorIcon,
      },
      ErrorUnknown: {
        contents: "예상치 못한 오류가 발생하였습니다.",
        icon: warningIcon,
      },
      boardNewRequired: {
        contents: "필수 입력값을 입력해 주세요.",
        icon: errorIcon,
      },
      boardNewSubmit: {
        contents: "게시글 등록이 완료되었습니다.",
        icon: successIcon,
      },
      productQuestionEdit: {
        contents: "질문이 수정되었습니다.",
        icon: successIcon,
      },
    }),
    []
  );

  if (isModal.type === "" || !isModal.isModalOpen) return null;

  return (
    <Modal
      centered={true}
      open={true}
      onOk={() => modalClose()}
      onCancel={() => modalClose()}
      footer={null}
      width={300}
    >
      <div className="flex flex-col gap-3 items-center">
        {modalTypeAndContents[isModal.type].icon}
        <div className="font-bold text-lg text-center flex flex-col gap-3 w-full">
          {modalTypeAndContents[isModal.type].contents}
        </div>
        {!modalTypeAndContents[isModal.type].customFooter ? (
          <Button
            size="large"
            variant="solid"
            color="primary"
            className="w-full"
            onClick={() => modalClose()}
          >
            확인
          </Button>
        ) : (
          modalTypeAndContents[isModal.type].customFooter
        )}
      </div>
    </Modal>
  );
}
