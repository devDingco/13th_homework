import InputFormTitle from "./InputFormTitle";

export default function InputFormPhoto({ title }) {
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
