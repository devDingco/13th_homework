import { IProps } from "./types";

export default function Input(props: IProps) {
  const PLACEHOLDER_MESSAGE = {
    writer: "작성자 명을 입력해 주세요.",
    password: "비밀번호를 입력해 주세요.",
    title: "제목을 입력해주세요.",
  };

  const LABEL = {
    writer: "작성자",
    password: "비밀번호",
    title: "제목",
  };

  const NAME = {
    writer: "writer",
    password: "password",
    title: "title",
  };

  return (
    <div className="flex flex-col w-full gap-2 ">
      <label>{LABEL[props.id]}</label>
      <input
        className="border py-3 px-4 rounded-lg border-solid border-[#d4d3d3]"
        id={props.id}
        name={NAME[props.id]}
        onChange={props.onChange}
        type={props.type || "text"}
        placeholder={PLACEHOLDER_MESSAGE[props.id]}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
      />

      <label
        className="font-medium text-base leading-6 text-[#f66a6a]"
        style={{ visibility: props.errorMessage }}
      >
        필수입력 사항 입니다.
      </label>
    </div>
  );
}
