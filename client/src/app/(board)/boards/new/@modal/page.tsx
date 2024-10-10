/** @format */
'use client';

import { IDeatilPageProps } from '@/models/children.type';
import ModalContainer from '../../_components/ModalContainer';
import useIsScrollLock from '@/hooks/useIsScrollLock';

export default function NewModalPage({ searchParams, params }: IDeatilPageProps) {
	const isModal = searchParams.address as boolean;

	useIsScrollLock(!!isModal);

	return searchParams.address && <ModalContainer address={isModal} boardId={+params.boardId} />;
}
