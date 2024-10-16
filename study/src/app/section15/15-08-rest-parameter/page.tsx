export default function RestPage() {
  const profile = {
    name: "철수",
    age: 20,
    school: "다람쥐초등학교",
    hobby: "컴퓨터 게임",
  };

  const { name, ...rest } = profile;
  console.log(name); // 철수
  delete profile.hobby; // hobby를 제거
  console.log(profile);

  return <div>sdfsdf</div>;
}
