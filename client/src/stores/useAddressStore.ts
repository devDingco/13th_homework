/** @format */

import { create } from 'zustand';

export const useAddressStore = create((set) => ({
	zonecode: '우편번호',
	address: '',
	setZoneCode: (zonecode: string) => set({ zonecode }),
	setAddress: (address: string) => set({ address }),
}));
