// 1. 문자열, 숫자, 불리언 (primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result = getPrimitive("hello", 123, true);

// 2. any 타입 - 그냥 자바스크립트랑 같음
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 * 5);
  return [arg3, arg2, arg1];
};
const result2 = getAny("hello", 123, true);

// 3. unknown 타입 - any와 비슷하지만 any보다는 타입 안정성이 높음
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  //console.log(arg1 * 5); // any와 달리 error로 알려줌
  if (typeof arg1 === "number") console.log(arg1 * 5); // 이렇게 타입 체크를 해주면 사용 가능
  return [arg3, arg2, arg1];
};
const result3 = getUnknown("hello", 123, true);

// 4. generic 타입 - 함수를 정의할 때 타입을 정하지 않고, 호출할 때 들어오는 타입에 따라 타입이 정해짐
const getGeneric1 = <TYPE1, TYPE2, TYPE3>(arg1: TYPE1, arg2: TYPE2, arg3: TYPE3): [TYPE3, TYPE2, TYPE1] => {
  return [arg3, arg2, arg1];
};
const result4 = getGeneric1("hello", 123, true);

// 5. generic 타입 - 타입명을 짧게 줄여서 사용할 수 있음
const getGeneric2 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result5 = getGeneric2(23321, 123, true);

// 6. generic 타입 - 함수 선언식
const getGeneric3 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result6 = getGeneric3<string, number, boolean>("sdfdsf", 123, true);
