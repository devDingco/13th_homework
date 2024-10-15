/** @format */

import { IBoardReader } from '@/models/boardReaderResponse';
import React from 'react';

interface ISuspenseProps {
	Component: React.ComponentType<{ boardInfor: any }>;
	resource: IBoardReader;
}

export default function ComposeSuspenseWrapper({ resource, Component }: ISuspenseProps) {
	const boardInfor = resource.read();

	return <Component boardInfor={boardInfor} />;
}
