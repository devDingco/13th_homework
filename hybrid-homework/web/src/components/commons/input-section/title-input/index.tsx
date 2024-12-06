import { InputNormal } from "../../input";

export default function SolplaceInputTitle() {
  return (
    <InputNormal
      label="플레이스 이름"
      name="title"
      type="text"
      placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
      isRequired={true}
    />
  );
}
