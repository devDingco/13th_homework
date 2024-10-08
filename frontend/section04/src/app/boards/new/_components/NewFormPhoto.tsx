import InputFormTitle from "./NewFormTitle";

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
