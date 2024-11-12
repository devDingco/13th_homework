import { IProps } from "./types";

export default function Textarea(props: IProps) {
  const PLACEHOLDER_MESSAGE = {
    contents: "내용을 입력해주세요.",
  };

  const LABEL = {
    contents: "내용",
  };

  const NAME = {
    contents: "contents",
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <label>{LABEL[props.id]}</label>
      <textarea
        className="w-full h-[336px] border resize-none px-4 py-3 rounded-lg border-solid border-[#d4d3d3]"
        id={props.id}
        name={NAME[props.id]}
        placeholder={PLACEHOLDER_MESSAGE[props.id]}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      ></textarea>
      <label
        className="font-medium text-base leading-6 text-[#f66a6a]"
        style={{ visibility: props.errorMessage }}
      >
        필수입력 사항 입니다.
      </label>
    </div>
  );
}
