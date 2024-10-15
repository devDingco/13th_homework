/** @format */

import { IBoardReader } from '@/models/boardReaderResponse';
import React from 'react';

interface ISuspenseProps {
	Component: React.ComponentType<{ data: any }>;
	resource: IBoardReader;
}

export default function ComposeSuspenseWrapper({ resource, Component }: ISuspenseProps) {
	const data = resource.read();

	return <Component data={data} />;
}
