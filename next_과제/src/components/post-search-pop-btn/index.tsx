import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button } from "antd";

type PostSearchPopProps = {
  setaddress: (field: string, value: string) => void;
  setzonecode: (field: string, value: string) => void;
  btnstyle?: string;
  disabled?: boolean;
};

const PostSearchPopBtn = (props: PostSearchPopProps) => {
  const { setaddress, setzonecode, btnstyle, disabled = false } = props;
  const open = useDaumPostcodePopup(process.env.DAUM_POSTCODE_API_KEY);

  interface dataType {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }

  const handleComplete = (data: dataType) => {
    let fullAddress = data.address;
    let extraAddress = "";
    const zoneCode = data.zonecode;

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
    setaddress("writeAddress", fullAddress);
    setzonecode("writeAddressPost", zoneCode);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button
      disabled={disabled}
      type="default"
      size="large"
      color="default"
      variant="solid"
      className={btnstyle ? btnstyle : "btn btn-outline"}
      onClick={() => handleClick()}
    >
      우편번호 검색
    </Button>
  );
};

export default PostSearchPopBtn;
