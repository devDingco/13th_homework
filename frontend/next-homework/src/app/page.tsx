import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h3>workation</h3>

      <div className="flex">
        <Link href={`/user/signup`}>
          <button>회원가입</button>
        </Link>
        <Link href={`/user/login`}>
          <button>로그인</button>
        </Link>
      </div>
    </div>
  );
}
