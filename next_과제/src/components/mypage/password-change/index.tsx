import Input from "@/components/input";
import { Button } from "antd";
import { usePasswordChange } from "./hook";

export default function PasswordChange() {
  const { control, errors, isValid, isDirty, passwordChange } =
    usePasswordChange();
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-bold text-lg">비밀번호 변경</h4>
      <form className="flex flex-col gap-4">
        <Input
          id="newPassword"
          type="password"
          title="새 비밀번호"
          control={control}
          errormessage={errors?.newPassword?.message?.toString()}
          required
        />
        <Input
          id="newPasswordCheck"
          type="password"
          title="새 비밀번호 확인"
          control={control}
          errormessage={errors?.newPasswordCheck?.message?.toString()}
          required
        />
        <Button
          className="self-end"
          color="primary"
          variant="solid"
          size="large"
          disabled={!isValid || !isDirty}
          onClick={() => passwordChange()}
        >
          비밀번호 변경
        </Button>
      </form>
    </div>
  );
}
