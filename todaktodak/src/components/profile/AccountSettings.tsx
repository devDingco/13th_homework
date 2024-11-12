import { AlertCircle, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import EditProfileModal from "../modals/EditProfileModal";

export default function AccountSettings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">계정 설정</h2>
        <div className="space-y-4">
          {/* 개인정보 수정 */}
          <button
            onClick={() => setShowEditModal(true)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-gray-500" />
              <span>개인정보 수정</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          {/* 회원탈퇴 */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between p-4 text-left text-red-600 hover:bg-red-50 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              <span>회원 탈퇴</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* 모달들 */}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </>
  );
}
