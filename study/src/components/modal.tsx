import { useRef, useEffect } from "react";

{
  /* <Modal
buttonName="우편번호 검색"
title="우편번호 검색"
contents={""}
visible={false}
onClick={() => {}}
btnstyle="whiteBtn"
modalstyle="modal-bottom"
/> */
}

type ModalProps = {
  buttonName: string;
  title?: string;
  contents?: string | JSX.Element;
  visible: boolean;
  btnstyle?: string;
  modalstyle?: string;
  // onClick?: () => void;
};

export default function Modal(props: ModalProps) {
  const {
    buttonName, // 모달 열기 버튼 이름
    title, // 모달 제목
    contents, // 모달 내용
    visible, // 모달 열기/닫기 상태
    // btnstyle, // 모달 열기 버튼 스타일
    // modalstyle, // 모달 스타일
    // onClick, // 모달 열기 버튼 클릭 이벤트
  } = props;
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    if (visible) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [visible]);

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current?.close();
    }
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && event.target === modalRef.current) {
      modalRef.current?.close();
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => modalRef.current?.showModal()}
      >
        {buttonName}
      </button>
      <dialog
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
        onClick={(event) => handleOutsideClick(event)}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{contents}</div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => handleClose()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
