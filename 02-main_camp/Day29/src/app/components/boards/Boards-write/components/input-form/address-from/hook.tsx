import { useState } from "react";
import { Address } from "react-daum-postcode";

const useAddressInputForm = () => {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const selectAddressHandler = (data: Address) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
  };

  return {
    zipcode,
    address,
    selectAddressHandler,
  };
};

export default useAddressInputForm;
