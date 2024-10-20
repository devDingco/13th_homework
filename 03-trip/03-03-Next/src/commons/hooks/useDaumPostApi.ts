import { useState } from "react";
import { Address } from "react-daum-postcode";

export default function useDaumPostApi() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addressData, setAddressData] = useState({});

    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleComplete = (data: Address) => {
        console.log(data);
        setAddressData(data);
        onToggleModal();
    };

    return {
        isModalOpen,
        addressData,
        onToggleModal,
        handleComplete,
    };
}
