/** @format */
'use client';

import { IDeatilPageProps } from '@/models/children.type';
import ModalContainer from '../../../_components/ModalContainer';

export default function modalEditPage({ searchParams }: IDeatilPageProps) {
	if (searchParams.modal) {
		document.body.classList.add('overflow-hidden');
	} else {
		document.body.classList.remove('overflow-hidden');
	}
	return searchParams.modal && <ModalContainer modal={searchParams.modal} />;
}
