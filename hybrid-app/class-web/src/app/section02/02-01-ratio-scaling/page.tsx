export default function RatioScalingPage() {
  // 1. 피그마에 제시된 사이즈가 (360 x 840) 이라고 가정합니다.
  // => 아래 예시는 비율이 늘어나지 않음
  // return (
  //   <div style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}>
  //     <div style={{ width: "300px", height: "400px", backgroundColor: "blue" }}>
  //       네모상자
  //     </div>
  //   </div>
  // );

  // 2. 비율이 늘어나도록 설정
  // => 아래 예시는 비율이 늘어남, px 단위를 rem 단위로 변경 (html 태그의 font-size에 영향을 받음)
  // html 태그의 font-size를 16px로 설정하면 1rem은 16px이 됩니다.
  // => 해야할일 : 1. html 의 폰트사이즈를 화면사이즈에 비례하도록 설정한다.
  //             2. 컴포넌트의 크기를 rem 단위로 설정한다.
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}>
      <div
        style={{ width: "18.75rem", height: "25rem", backgroundColor: "red" }}
      >
        네모상자
      </div>
    </div>
  );
}
