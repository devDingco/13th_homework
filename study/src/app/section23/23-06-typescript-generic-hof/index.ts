// 1. HOF (Higher Order Function) - 함수를 인자로 받아서 함수를 리턴하는 함수
function first<T>(arg1: T) {
  return function second<V>(arg2: V): [T, V] {
    return [arg1, arg2];
  };
}

const result = first("영희")(8); // 영희 8

// 2. HOF - 화살표 함수
// prettier-ignore
const first2 = <T>(arg1: T) => <V>(arg2: V): [T, V] => {
    return [arg1, arg2];
};

const result2 = first("영희")(8); // 영희 8

// 3. HOF - 화살표 함수
// prettier-ignore
const with로그인체크 = <C>(component: C) => <P>(props: P): [C, P] => {
  return [component, props];
};

const result3 = with로그인체크("영희")(8); // 영희 8
