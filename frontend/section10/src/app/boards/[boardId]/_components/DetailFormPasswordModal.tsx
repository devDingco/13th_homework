"use client";
import { useMutation } from "@apollo/client";
import { UpdateBoardDocument } from "@/commons/graphql/graphql";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

export default function DetailFormPasswordModal({ boardId, handleShowDialog }) {
  const router = useRouter();
  const { toast } = useToast();

  const [passwordInput, setPasswordInput] = useState("");
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const onSubmitPassword = async () => {
    console.log("비밀번호 검사 수행");

    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {},
          boardId: boardId,
          password: passwordInput,
        },
      });
      sessionStorage.setItem("password", passwordInput); // sessionStorage에 저장
      router.push(`/boards/new/${boardId}`);
    } catch (error) {
      const gqlError = error as GraphQLError;
      const errorMessages = gqlError.graphQLErrors!.map((err) => err.message);
      // alert(errorMessages.join(", "));
      console.log(errorMessages.join(", "));
      toast({
        title: "Error",
        description: "비밀번호가 일치하지 않습니다",
        variant: "destructive",
      });
      // router.back();
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비밀번호 입력</DialogTitle>
        </DialogHeader>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <DialogFooter className="flex items-center">
          <Button variant={"blue"} size={"sm"} onClick={onSubmitPassword}>
            확인
          </Button>
          <DialogClose asChild>
            <Button variant={"outlined"} size={"sm"} onClick={handleShowDialog}>
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
