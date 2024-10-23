export default function MapElPage() {
  return (
    <div>
      {/* 1. 기본 사용 */}
      {["철수", "영희", "훈이"].map((el, index) => (
        <div key={index}>{el}</div>
      ))}

      <br />

      {/* 2. 매개변수 변경 사용 : 매개변수의 이름은 내가 정하는데로 쓰는거다 */}
      {["철수", "영희", "훈이"].map((name, num) => (
        <div key={num}>{name}</div>
      ))}

      <br />

      {/* 2. 함수 선언식 사용 */}
      {["철수", "영희", "훈이"].map(function (name, num) {
        return <div key={num}>{name}</div>;
      })}
    </div>
  );
}
