interface AgreementStepProps {
  agreements: boolean[];
  onAgreementChange: (index: number) => void;
  onShowDetail: (content: string) => void;
}

export function AgreementStep({
  agreements,
  onAgreementChange,
  onShowDetail,
}: AgreementStepProps) {
  const allChecked = agreements.every(Boolean);
  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    agreements.forEach((_, index) => onAgreementChange(index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">서비스 이용약관</h2>
        <p className="text-gray-600">서비스 이용을 위해 약관에 동의해주세요</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="all-agree"
            checked={allChecked}
            onChange={handleAllAgree}
            className="w-5 h-5 text-indigo-600 rounded"
          />
          <label htmlFor="all-agree" className="ml-3 font-medium">
            모든 약관에 동의합니다
          </label>
        </div>

        <div className="space-y-3 ml-2">
          {agreements.map((agreement, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`agree-${index}`}
                  checked={agreement}
                  onChange={() => onAgreementChange(index)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor={`agree-${index}`} className="ml-3">
                  {agreement.label}
                  {agreement.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              </div>
              <button
                type="button"
                onClick={() => onShowDetail(agreement.content)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                보기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
