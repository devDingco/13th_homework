/** @format */
'use client';

import { IModalProps } from '@/models/children.type';
import ModalContainer from '../_components/ModalContainer';
import { useEffect } from 'react';

export default function ModalPage({ searchParams }: IModalProps) {
	useEffect(() => {
		if (searchParams.boardId) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [searchParams.boardId]);

	return searchParams.boardId && <ModalContainer boardId={+searchParams.boardId} />;
}
