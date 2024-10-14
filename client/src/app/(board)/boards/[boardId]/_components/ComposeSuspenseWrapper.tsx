/** @format */

import React, { useMemo } from 'react';

import commonGet from '@/apis/commonGet';
import { wrapPromise } from '@/utils/wrapPromise';

interface ISuspenseProps {
	children: React.ReactNode;
	url: string;
}

export default function ComposeSuspenseWrapper({ url, children }: ISuspenseProps) {
	const resource = useMemo(() => wrapPromise(commonGet(url)), [url]);

	const boardInfor = resource.read();

	return <> {React.cloneElement(children as React.ReactElement<unknown>, { boardInfor })}</>;
}
