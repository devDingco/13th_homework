import Input from "@/components/input";
import { Button } from "antd";
import { usePasswordChange } from "./hook";
import { FormProvider } from "react-hook-form";

export default function PasswordChange() {
  const { methods, passwordChange } = usePasswordChange();
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-bold text-lg">비밀번호 변경</h4>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4">
          <Input
            id="newPassword"
            type="password"
            title="새 비밀번호"
            required
          />
          <Input
            id="newPasswordCheck"
            type="password"
            title="새 비밀번호 확인"
            required
          />
          <Button
            className="self-end"
            color="primary"
            variant="solid"
            size="large"
            disabled={!methods.formState.isValid || !methods.formState.isDirty}
            onClick={() => passwordChange()}
          >
            비밀번호 변경
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
