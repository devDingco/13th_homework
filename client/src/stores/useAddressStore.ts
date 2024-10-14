/** @format */
interface IaddressState {
	zonecode: string;
	address: string;
	setZoneCode: (zonecode: string) => void;
	setAddress: (address: string) => void;
}

import { create } from 'zustand';

export const useAddressStore = create<IaddressState>((set) => ({
	zonecode: '우편번호',
	address: '',
	setZoneCode: (zonecode: string) => set({ zonecode }),
	setAddress: (address: string) => set({ address }),
}));
