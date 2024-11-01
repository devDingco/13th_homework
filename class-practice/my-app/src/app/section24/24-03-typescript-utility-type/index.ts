interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. partial 타입
type aaa = Partial<IProfile>;

// 2. required 타입
type bbb = Required<IProfile>;

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; //union 타입 - 선언한 값들만 사용가능함
const child1: eee = "짱구"; //error - 철수 영희 훈이만 넣을 수 있음
const child2: string = "사과"; // 스트링타입 다 됨
console.log(child1);

type fff = Record<eee, IProfile>; // key, value로 구성된 객체를 만듦

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile; //"name" | "age" | "school" | "hobby"
const myprofile: ggg = "hobby";

// 7. type vs interface 차이 => interface는 선언병합 가능
interface IProfile {
  candy: number;
}

const qqq: IProfile = {
  name: "철수",
  candy: 3,
  //.....
};

// 8. 배운거 응용
const profile: Patial<IProfile> = {};
