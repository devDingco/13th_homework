import Input from "@/components/input";
import InputField from "@/components/inputField";

export default function PlaceName() {
  return (
    <InputField name="플레이스 이름" required>
      <Input
        placeholder="플레이스 이름을 입력해 주세요. (1자 이상)"
        name="title"
      />
    </InputField>
  );
}
