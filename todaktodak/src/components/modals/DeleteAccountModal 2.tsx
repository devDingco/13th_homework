interface DeleteAccountModalProps {
  onClose: () => void;
}

export default function DeleteAccountModal({
  onClose,
}: DeleteAccountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
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
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
