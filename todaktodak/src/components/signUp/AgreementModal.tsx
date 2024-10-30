interface AgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export function AgreementModal({
  isOpen,
  onClose,
  content,
}: AgreementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full">
        <h3 className="text-lg font-medium mb-4">약관 상세</h3>
        <div className="prose max-h-96 overflow-y-auto">{content}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
