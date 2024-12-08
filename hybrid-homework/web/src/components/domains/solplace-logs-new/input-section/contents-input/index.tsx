import { TextareaNormal } from "@/components/commons/textarea";

export default function SolplaceInputContents() {
  return (
    <TextareaNormal
      name="contents"
      label="플레이스 내용"
      placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
      isRequired={true}
    />
  );
}
