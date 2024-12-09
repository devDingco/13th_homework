import { TextareaNormal } from "@/components/commons/textarea";
import { ISchema } from "../../form.schema";

export default function SolplaceInputContents() {
  return (
    <TextareaNormal<ISchema>
      name="contents"
      label="플레이스 내용"
      placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
      isRequired={true}
    />
  );
}
