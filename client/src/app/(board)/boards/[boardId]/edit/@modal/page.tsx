/** @format */

import { IDeatilPageProps } from '@/models/children.type';
import ModalContainer from '../../../_components/ModalContainer';

export default function modalEditPage({ searchParams }: IDeatilPageProps) {
	return searchParams.modal && <ModalContainer modal={searchParams.modal} />;
}
