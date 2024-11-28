import { memo } from "react";

function ChildPage(props) {
  const { countState } = props;
  console.log("자식이다", countState);
  // memo를 사용하면, 부모가 리렌더링되어도 자식은 리렌더링되지 않는다.
  // memo를 사용하면, 자식 컴포넌트가 리렌더링되는 조건은, props가 변경되었을 때이다.

  return (
    <>
      <div>=================================</div>
      <h1>나는 자식이다!!!</h1>
      <div>=================================</div>
    </>
  );
}

export default memo(ChildPage);
