import { useState } from "react";
import { Address } from "react-daum-postcode";
import useSubmitInput from "./useSubmitInput";

export default function useDaumPostApi() {
    const { zipcode, setZipcode, address, setAddress } = useSubmitInput();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addrData, setAddrData] = useState<Address>();

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleComplete = (data: Address) => {
        setAddrData(data);
        setZipcode(data.zonecode);
        console.log(zipcode);
        setAddress(data.address);
        console.log(address);
        onToggleModal();
    };

    return {
        isModalOpen,
        addrData,
        onToggleModal,
        handleComplete,
    };
}
