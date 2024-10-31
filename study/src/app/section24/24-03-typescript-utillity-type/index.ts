interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial<타입명> : 해당하는 타입명의 모든 속성을 optional로 만든다.
type aaa = Partial<IProfile>;

// 2. Required<타입명> : 해당하는 타입명의 모든 속성을 required로 만든다.
type bbb = Required<IProfile>;

// 3. Pick<타입명, 키 타입> : 해당하는 타입명에서 키 타입에 해당하는 속성만 뽑아서 만든다.
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit<타입명, 키 타입> : 해당하는 타입명에서 키 타입에 해당하는 속성을 제외하고 만든다. (Pick의 반대)
type ddd = Omit<IProfile, "school">;

// 5. Record<키 타입, 값 타입> : 키 타입과 값 타입을 받아서 객체로 만들어준다.
type eee = "철수" | "영희" | "훈이"; // Union 타입
const child1: eee = "철수"; // 철수, 영희, 훈이만 됨, 짱구 입력시 에러
const child2: string = "사과"; // 철수, 영희, 훈이, 사과, 바나나 다 됨
type fff = Record<eee, IProfile>; // Record 타입
type ggg = Record<eee, number>;

// 6. 객체의 key들로 Union 타입을 만들어준다.
type hhh = keyof IProfile;
const myprorile: hhh = "hobby"; // name, age, school, hobby 중 하나만 가능

// 7. type vs interface
// type : 확장이 불가능하다.
// interface : 확장이 가능하다. 선언병합이 가능하다.
interface IProfile {
  candy: number;
}

const iii: IProfile = {
  name: "철수",
  age: 10,
  school: "다람쥐초등학교",
  candy: 5,
};

// 활용 예시 - IProfile의 속성을 전부 입력하지 않아도 되게끔 만들어줌
const profile: Partial<IProfile> = {
  candy: 100,
};
