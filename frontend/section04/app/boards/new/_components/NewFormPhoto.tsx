import InputFormTitle from "./NewFormTitle";
import { IInputFormTextProps } from "../../_models/new-props";

export default function InputFormPhoto({ title }: IInputFormTextProps) {
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
      <div className="photo-area">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
