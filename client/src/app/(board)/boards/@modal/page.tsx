/** @format */
'use client';

import { IModalProps } from '@/models/children.type';
import ModalContainer from '../_components/ModalContainer';

export default function ModalPage({ searchParams }: IModalProps) {
	if (searchParams.boardId) {
		document.body.classList.add('overflow-hidden');
	} else {
		document.body.classList.remove('overflow-hidden');
	}
	return searchParams.boardId && <ModalContainer boardId={searchParams.boardId} />;
}
