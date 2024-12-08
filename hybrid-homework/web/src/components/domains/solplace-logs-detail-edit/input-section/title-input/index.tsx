import { InputNormal } from "@/components/commons/input";
import { ISchema } from "../../form.schema";

export default function SolplaceInputTitle() {
  return (
    <InputNormal<ISchema>
      label="플레이스 이름"
      name="title"
      placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
      isRequired={true}
    />
  );
}
