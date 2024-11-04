"use client";
import styles from "./styles.module.css";

// 1. 버튼의 뼈대 만들기
// 변경이 되지않는 공통부분을 만들어준다
function ButtonBase(props) {
  return <button {...props}>{props.children}</button>;
}

// 컴포넌트 명에 특정 컬러나 사이즈가 들어가는 것은 좋지 않다
// 추상적인 이름을 사용하는 것이 좋다
// 또한 자동완성형태로 사용하기 쉽도록
// Button 같은 변경되지 않는 부분이 앞에서 시작하게끔 사용하는 것이 좋다
// ! 변경을 최소화 할수 있는 설계가 중요하다!!!!

// export function ButtonSoftML
// 예시) 가로:M 세로:L
// 풀사이즈는:Full 내용에맞춰들어가는사이즈:Fit
// 이러한 형태로 사용하는 것이 좋다
export function ButtonSoftMFull(props) {
  return (
    <ButtonBase className={styles.button__soft__m__full} {...props}>
      {props.children}
    </ButtonBase>
  );
}

export function ButtonThinFitM(props) {
  return (
    <ButtonBase className={styles.button__thin__Fit__M} {...props}>
      {props.children}
    </ButtonBase>
  );
}

export function ButtonCircleMM(props) {
  return (
    <ButtonBase className={styles.button__soft__M__M} {...props}>
      {props.children}
    </ButtonBase>
  );
}
