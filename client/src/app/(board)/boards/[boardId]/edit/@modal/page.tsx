/** @format */
'use client';

import { IDeatilPageProps } from '@/models/children.type';
import ModalContainer from '../../../_components/ModalContainer';
import { useEffect } from 'react';

export default function ModalEditPage({ searchParams }: IDeatilPageProps) {
	useEffect(() => {
		if (searchParams.modal) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [searchParams.modal]);
	return searchParams.modal && <ModalContainer modal={searchParams.modal} />;
}
