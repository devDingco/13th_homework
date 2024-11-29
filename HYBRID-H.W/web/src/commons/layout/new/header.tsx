import Image from 'next/image';

export default function RegisterHeader() {
  // 나중에 아마 뒤로 나가기? 버튼 기능
  return (
    <header className="flex gap-2 p-3 m-6">
      <button type="button">
        <Image
          src="/icons/left-icon.png"
          alt="왼쪽화살표"
          width={24}
          height={24}
        ></Image>
      </button>
      <h3>플레이스 등록</h3>
    </header>
  );
}
