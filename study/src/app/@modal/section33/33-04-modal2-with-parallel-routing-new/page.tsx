import { Modal } from "antd";

export default function Modal2WithParallelRoutingNewPage() {
  return (
    <Modal open={true}>
      <div className="flex flex-col gap-3">
        <label htmlFor="">
          제목 : <input type="text" name="title" />
        </label>
        <label htmlFor="">
          내용 : <input type="text" name="contents" />
        </label>
        <button className="bg-black text-white">등록하기</button>
      </div>
    </Modal>
  );
}
