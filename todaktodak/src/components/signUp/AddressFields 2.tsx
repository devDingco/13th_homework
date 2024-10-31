import { useDaumPostcodePopup } from "react-daum-postcode";

interface AddressFieldsProps {
  address: {
    zipcode: string;
    address1: string;
    address2: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AddressFields({ address, onChange }: AddressFieldsProps) {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    // 주소 데이터 처리
    const e = {
      target: {
        name: "address.zipcode",
        value: data.zonecode,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(e);

    const e2 = {
      target: {
        name: "address.address1",
        value: data.address,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(e2);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">주소</label>
      <div className="flex space-x-2">
        <input
          name="address.zipcode"
          value={address.zipcode}
          onChange={onChange}
          readOnly
          className="w-32 px-4 py-2 border rounded-lg bg-gray-50"
          placeholder="우편번호"
        />
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          주소 검색
        </button>
      </div>
      <input
        name="address.address1"
        value={address.address1}
        onChange={onChange}
        readOnly
        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
        placeholder="기본 주소"
      />
      <input
        name="address.address2"
        value={address.address2}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        placeholder="상세 주소 입력"
      />
    </div>
  );
}
