import {
  CheckCircleFilled,
  InfoCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import { Button, Modal } from "antd";

interface ImodalContent {
  type: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalAlertBox(props: ImodalContent) {
  const { type, setIsModalOpen } = props;
  const content: { [key: string]: { contents: string; icon: JSX.Element } } = {
    commentNewSubmit: {
      contents: "댓글 등록이 완료되었습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
      ),
    },
    commentEditSubmit: {
      contents: "댓글 수정이 완료되었습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
      ),
    },
    commentEditPasswordRequired: {
      contents: "비밀번호를 입력해 주세요.",
      icon: <InfoCircleFilled style={{ fontSize: "40px", color: "#faad14" }} />,
    },
    commentEditPasswordError: {
      contents: "비밀번호가 일치하지 않습니다.",
      icon: (
        <ExclamationCircleFilled
          style={{ fontSize: "40px", color: "#faad14" }}
        />
      ),
    },
    commentEditErrorUnknown: {
      contents: "예상치 못한 오류가 발생하였습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
      ),
    },
    boardEditSubmit: {
      contents: "게시글 수정이 완료되었습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
      ),
    },
    boardEditPasswordError: {
      contents: "비밀번호가 일치하지 않습니다.",
      icon: (
        <ExclamationCircleFilled
          style={{ fontSize: "40px", color: "#faad14" }}
        />
      ),
    },
    boardEditErrorUnknown: {
      contents: "예상치 못한 오류가 발생하였습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
      ),
    },
    boardNewRequired: {
      contents: "필수 입력값을 입력해 주세요.",
      icon: <InfoCircleFilled style={{ fontSize: "40px", color: "#faad14" }} />,
    },
    boardNewSubmit: {
      contents: "게시글 등록이 완료되었습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
      ),
    },
    boardNewErrorUnknown: {
      contents: "예상치 못한 오류가 발생하였습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
      ),
    },
    commentNewErrorUnknown: {
      contents: "예상치 못한 오류가 발생하였습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#ff4d4f" }} />
      ),
    },
    productQuestionEdit: {
      contents: "질문이 수정되었습니다.",
      icon: (
        <CheckCircleFilled style={{ fontSize: "40px", color: "#52c41a" }} />
      ),
    },
  };
  return (
    <Modal
      centered={true}
      open={true}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={300}
    >
      <div className="flex flex-col gap-3 items-center">
        {content[type].icon}
        <h3 className="font-bold text-lg">{content[type].contents}</h3>
        <Button
          className="w-full"
          key="back"
          onClick={() => setIsModalOpen(false)}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
