/** @format */

import { create } from 'zustand';

export const useAddressStore = create((set) => ({
	zonecode: '',
	address: '',
	setZoneCode: (zonecode: string) => set({ zonecode }),
	setAddress: (address: string) => set({ address }),
}));
