import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "./input";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  password: string;
  setPassword: (password: string) => void;
}

export function PasswordModal({
  isOpen,
  onClose,
  onSubmit,
  password,
  setPassword,
}: PasswordModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비밀번호 입력</DialogTitle>
          <DialogDescription>
            게시글 수정을 위해 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <DialogFooter>
          <Button onClick={onSubmit}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
