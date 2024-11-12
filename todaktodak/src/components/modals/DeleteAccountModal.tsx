import { gql, useMutation } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";

interface DeleteAccountModalProps {
  onClose: () => void;
}

// Authorization 헤더에서 토큰 -> 토큰에서 userId확인 -> 사용자 삭제 -> 성공하면 true 반환
export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

export default function DeleteAccountModal({
  onClose,
}: DeleteAccountModalProps) {
  const { data: session } = useSession();

  const [deleteUser] = useMutation(DELETE_USER, {
    context: {
      // HTTP 헤더의 Authorization에 토큰!!!!!!!!
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  });

  // 사용자 삭제
  const handleDeleteAccount = async () => {
    try {
      const { data, errors } = await deleteUser();

      if (errors) {
        console.error("deleteUser 실패", errors);
        return;
      }

      if (data?.deleteUser) await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">회원 탈퇴</h3>
        <p className="text-gray-600 mb-6">
          정말로 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며 복구할 수
          없습니다.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
