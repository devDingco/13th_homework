import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="./boards/new">새글작성</Link>
      <br />
      <Link href="./boards/list">목록</Link>
    </div>
  );
}
