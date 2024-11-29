/** @format */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IChildrenProps } from '@/types/layout.type';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: IChildrenProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
}
