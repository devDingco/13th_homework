import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="./boards/new">입력 폼</Link>
      <Link href="./boards/detail">상세</Link>
    </div>
  );
}
