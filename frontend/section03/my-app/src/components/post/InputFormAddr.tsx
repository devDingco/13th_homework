import InputFormTitle from "./InputFormTitle";
import { ITitle } from "../../models/InputFormTitle";
import ValidationMessage from "./ValidationMessage";

export default function InputFormAddr({ title }: ITitle) {
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
    </div>
  );
}
