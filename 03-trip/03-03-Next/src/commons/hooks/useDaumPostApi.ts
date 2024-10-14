import { useEffect, useState } from "react";
import { Address } from "react-daum-postcode";

export default function useDaumPostApi() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    // const [addressData, setAddressData] = useState<Address>();
    const [zipcode, setZipcode] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const handleComplete = (data: Address) => {
        console.log(data);
        setZipcode(data.zonecode);
        setAddress(data.address);
        onToggleModal();
    };

    useEffect(() => {
        console.log(zipcode, address);
    }, [zipcode, address]);

    return {
        isModalOpen,
        zipcode,
        address,
        onToggleModal,
        handleComplete,
    };
}
