'use client';

import { useAppContext } from '@/contexts/AppContext';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Address } from 'react-daum-postcode';

export default function usePostCode() {
    const appContext = useAppContext();
    const [isVisible, setIsVisible] = useState(false);

    const openPost = useDaumPostcodePopup();

    const handlePostCodeSearch = () => {
        openPost({ onComplete: handleComplete });
        setIsVisible(true);
    };

    const handleComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        appContext.setBoardAddress((prev) => ({
            ...prev,
            zipcode: data.zonecode,
            address: fullAddress,
        }));
        setIsVisible(false);
    };

    return {
        postCode: appContext.boardAddress.zipcode,
        boardAddress: appContext.boardAddress.address,
        detailAddress: appContext.boardAddress.addressDetail,
        handlePostCodeSearch,
        isVisible,
        setIsVisible,
        handleComplete,
        openPost,
    };
}
