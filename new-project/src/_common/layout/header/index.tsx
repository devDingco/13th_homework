"use client";

export default function Header() {
  return (
    <header className="w-screen h-14 bg-pink-300 flex justify-around place-items-center">
      <p>아이콘</p>
      <p>사고팔기</p>
      <p>트립토크</p>
      {/* TourAPI 사용 */}
      <p>여행지 추천</p>
      <p>마이페이지</p>
      <p>프로필 이미지</p>
    </header>
  );
}
