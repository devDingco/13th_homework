import { ChangeEvent, useState } from "react";
import { Address } from "react-daum-postcode";

const useAddressInputForm = () => {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const selectAddressHandler = (data: Address) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
  };

  return {
    zipcode,
    address,
    onChangeAddressDetail,
    selectAddressHandler,
  };
};

export default useAddressInputForm;
