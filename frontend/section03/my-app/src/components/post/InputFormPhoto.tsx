import InputFormTitle from "./InputFormTitle";
import { ITitle } from "../../models/InputFormTitle";
export default function InputFormPhoto({ title }: ITitle) {
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
