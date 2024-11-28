/** @format */

export interface IDetailHeaderProps {
	name: string;
}

export interface IDetailAddressProps extends IKakaoMapProps {
	address: string;
}
export interface IKakaoMapProps {
	lat: number;
	lng: number;
}
