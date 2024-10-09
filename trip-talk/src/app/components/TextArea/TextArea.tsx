import { PLACEHOLDERS } from "../../../enums/constants";
import { ITextArea } from "../../../types/components.type";

export default function TextArea({
  id,
  onChange,
  value,
  defaultValue,
}: ITextArea) {
  return (
    <textarea
      id={id}
      placeholder={String(PLACEHOLDERS[id])}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  );
}
