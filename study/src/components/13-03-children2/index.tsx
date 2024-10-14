import { IBoxProps } from "./types";

export default function Box({ children, school }: IBoxProps) {
  return (
    <>
      <div>====== 컴포넌트 ======</div>
      <div>{school}</div>
      <div>{children}</div>
      <div>====== 컴포넌트 ======</div>
    </>
  );
}
