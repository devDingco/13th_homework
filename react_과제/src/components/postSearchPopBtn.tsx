import { useDaumPostcodePopup } from "react-daum-postcode";

type PostSearchPopProps = {
  setAddress: (address: string) => void;
  setZoneCode: (zoneCode: string) => void;
  btnstyle?: string;
};

const PostSearchPopBtn = (props: PostSearchPopProps) => {
  const { setAddress, setZoneCode, btnstyle } = props;
  const open = useDaumPostcodePopup(
    process.env.REACT_APP_DAUM_POSTCODE_API_KEY
  );

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress);
    setZoneCode(zoneCode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      className={btnstyle ? btnstyle : "btn btn-outline"}
      type="button"
      onClick={() => handleClick()}
    >
      우편번호 검색
    </button>
  );
};

export default PostSearchPopBtn;
