import _ from "lodash";

export default function Page() {
  // 객체를 복사할 때는 spread 연산자를 사용하면 된다.
  // 스프레드 연산자 사용시 원본의 값은 그대로 두고 새로운 변수에 객체를 복사할 수 있다.
  // ! 이러한 복사 방식을 얕은 복사(Shallow-Copy) 이라고 한다.
  const profile1 = {
    name: "John Doe",
    age: 30,
  };
  const profile2 = { ...profile1 };
  profile2.age = 15;
  console.log(profile1, profile2);

  // 원본의 주소를 그대로 참조하고 있기 때문에 profile11의 age값이 변경되면 profile22의 age값도 변경된다.
  const profile11 = {
    name: "John Doe",
    age: 30,
  };
  const profile22 = profile11;

  profile22.age = 15;
  console.log(profile11, profile22);

  // 원시값을 복사할 때는 그냥 할당하면 된다.
  const age = 30;
  let age2 = age;
  age2 = 15;
  console.log(age, age2);

  // ! 얕은 복사이기 때문에 depth 2이상의 깊이를 가진 객체를 복사하여 수정할때 원본이 같이 변경되는 문제가 발생할 수 있다.
  const profile_20 = {
    name: "John Doe",
    age: 30,
    emails: {
      main: "mainEmail",
      sub: "subEmail",
    },
  };

  const profile_21 = { ...profile_20 };
  profile_21.emails.main = "newMainEmail"; // 얕은 복사이므로 depth2이상의 변경에 대하여 원본이 같이 변경됨
  console.log(profile_20);
  console.log(profile_21);

  const 학생들 = ["철수", "영희", "훈이", ["철수", "영희", "훈이"]];
  const 학생들2 = [...학생들];
  학생들2[3][1] = "영희2"; // 얕은 복사이므로 depth2이상의 변경에 대하여 원본이 같이 변경됨
  console.log(학생들, 학생들2);

  // ! 깊은 복사(Deep-Copy)를 하려면 JSON 객체를 사용하면 된다.
  const profile_30 = {
    name: "John Doe",
    age: 30,
    emails: {
      main: "mainEmail",
      sub: "subEmail",
    },
  };
  const profile_31 = JSON.parse(JSON.stringify(profile_30));
  profile_31.emails.main = "newMainEmail"; // 원본은 그대로 유지되고 profile_31만 수정됨
  console.log(profile_30);
  console.log(profile_31);

  // !객체를 const로 선언하더라도 객체 내부의 값은 변경할 수 있다.
  // !만약에 객체 내부의 값을 변경하지 못하게 하려면 Object.freeze()를 사용하면 된다.
  // Object.freeze(profile_30);
  // profile_30.age = 15; // 위에서 freeze로 변경이 안되도록 처리했기에 에러발생
  // console.log(profile_30);

  const arr = ["철수", "영희", "훈이"];
  const arr2 = ["사과", "바나나", "딸기"];

  const other = _.concat(arr, arr2);
  console.log(other);

  const objects = [{ a: 1 }, { b: 2 }];
  const deep = _.cloneDeep(objects); // lodash를 활용하여 복사하는 형태 (깊은 복사가 가능하고 성능이 좋다)
  console.log(deep[0] === objects[0]);

  return <></>;
}
