import Link from "next/link";

const Bbb = () => {
  return (
    <>
      <div>Bbb 페이지 입니다.</div>

      <Link href="/se4/aaa">Aaa 페이지로 가는 기능 - 신버전</Link>

      <a href="/se4/aaa">Aaa 페이지 이동 - 구버전</a>
    </>
  );
};

export default Bbb;
