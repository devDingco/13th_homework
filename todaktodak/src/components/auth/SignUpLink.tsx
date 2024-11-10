import Link from "next/link";

export default function SignUpLink() {
  return (
    <div className="mt-6 text-center">
      <span className="text-sm text-gray-600">계정이 없으신가요?</span>
      <Link
        href="/signup"
        className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
      >
        회원가입
      </Link>
    </div>
  );
}
