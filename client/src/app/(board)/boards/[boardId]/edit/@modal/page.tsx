/** @format */
'use client';

import { IDeatilPageProps } from '@/models/children.type';
import ModalContainer from '../../../_components/ModalContainer';
import useIsScrollLock from '@/hooks/useIsScrollLock';

export default function ModalEditPage({ searchParams, params }: IDeatilPageProps) {
	const isModal = searchParams.modal as boolean;
	useIsScrollLock(isModal);

	return searchParams.modal && <ModalContainer modal={isModal} boardId={+params.boardId} />;
}
