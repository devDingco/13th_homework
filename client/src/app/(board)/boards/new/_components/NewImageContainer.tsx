/** @format */

import { InputImage } from '@/components/ui/inputImage';
import { Label } from '@/components/ui/label';

export default function NewImageContainer() {
	return (
		<div className="flex flex-col gap-2">
			<div className="prose-me_16_24">사진 첨부</div>
			<div className="mt-2 flex gap-4">
				<div className="grid w-48 items-center gap-1.5">
					<Label htmlFor="picture">사진1</Label>
					<InputImage id="picture" type="file" />
				</div>
				<div className="grid w-48 items-center gap-1.5">
					<Label htmlFor="picture">사진2</Label>
					<InputImage id="picture" type="file" />
				</div>
				<div className="grid w-48 items-center gap-1.5">
					<Label htmlFor="picture">사진3</Label>
					<InputImage id="picture" type="file" />
				</div>
			</div>
		</div>
	);
}
