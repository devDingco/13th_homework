import Input from "@/components/input";

export default function JoinPage() {
  return (
    <>
      <h1 className="font-semibold text-md">회원가입</h1>
      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium">
          회원가입을 위해 아래 빈칸을 모두 채워 주세요.
        </p>
        <form className="flex flex-col gap-3">
          <Input className="h-10" title="이메일" type="email" required />
          <Input className="h-10" title="이름" type="text" required />
          <Input className="h-10" title="비밀번호" type="password" required />
          <Input
            className="h-10"
            title="비밀번호 확인"
            type="password"
            required
          />
        </form>
        <button className="btn btn-primary text-base-100">회원가입</button>
      </div>
    </>
  );
}
