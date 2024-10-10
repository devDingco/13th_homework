/** @format */

import { boardsUrlEndPoint, newUrlEndPoint } from '@/apis/config';

import DaumPostcode from 'react-daum-postcode';
import { useAddressStore } from '@/stores/useAddressStore';
import useOnClickPush from '@/hooks/useOnClickPush';

export default function NewModalWrapper() {
	// 타입에러는 천천히 잡겠습니다 구현부터 해볼게요
	const { setAddress, setZoneCode } = useAddressStore();
	const onClickPush = useOnClickPush();
	// 구현을 위한 any 사용 조금만 하겠습니다..
	const onCompleteHandler = (data: any) => {
		const { address, zonecode } = data;
		setAddress(address);
		setZoneCode(zonecode);
		onClickPush(`${boardsUrlEndPoint}${newUrlEndPoint}`);
	};
	return <DaumPostcode onComplete={onCompleteHandler} />;
}
