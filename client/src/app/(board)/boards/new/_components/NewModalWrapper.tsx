/** @format */

import DaumPostcode, { Address } from 'react-daum-postcode';
import { boardsUrlEndPoint, newUrlEndPoint } from '@/apis/config';

import { useAddressStore } from '@/stores/useAddressStore';
import useOnClickPush from '@/hooks/useOnClickPush';

export default function NewModalWrapper() {
	const { setAddress, setZoneCode } = useAddressStore();
	const onClickPush = useOnClickPush();

	const onCompleteHandler = (data: Address) => {
		const { address, zonecode } = data;
		setAddress(address);
		setZoneCode(zonecode);
		onClickPush(`${boardsUrlEndPoint}${newUrlEndPoint}`);
	};
	return <DaumPostcode onComplete={onCompleteHandler} />;
}
