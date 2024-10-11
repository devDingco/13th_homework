import { Modal } from "antd";
import useModalContainer from "./hook";

export enum ModalType {
  inputPassword = "password",
  success = "success",
  error = "error",
}

export interface IModalProps {
  // type: ModalType;
  title?: string;
  content: string;
}

const ModalContainer = (props: IModalProps) => {
  const { showModal, isModalOpen, onClickOk, onClickModalCancel } =
    useModalContainer();

  return (
    <>
      <button onClick={showModal}>Open Modal</button>
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={onClickOk}
        onCancel={onClickModalCancel}
      >
        {props.content}
      </Modal>
    </>
  );
};

export default ModalContainer;
