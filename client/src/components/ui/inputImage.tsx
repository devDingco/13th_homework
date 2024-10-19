/** @format */

import * as React from 'react';

import { Label } from './label';
import { cn } from '@/libs/utils';

// export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputImage = React.forwardRef<HTMLInputElement, any>(({ number }, ref) => {
	return (
		<div className="grid w-48 items-center gap-1.5">
			<Label htmlFor="picture">{`사진${number + 1}`}</Label>
			<input
				id={number}
				type="file"
				className={cn(
					'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
				)}
				name="image"
				ref={ref}
			/>
		</div>
	);
});
InputImage.displayName = 'InputImage';

export { InputImage };
