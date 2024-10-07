import InputFormTitle from "./NewFormTitle";
import { IInputFormTextProps } from "../../_models/new-props";

export default function InputFormAddr({ title }: IInputFormTextProps) {
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
    </div>
  );
}
