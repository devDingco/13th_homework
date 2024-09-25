import InputFormTitle from "./InputFormTitle";
import InputFromText from "./InputFormText";
import ValidationMessage from "./ValidationMessage";

export default function InputFormAddr({ title }) {
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
    </div>
  );
}
