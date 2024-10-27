'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import type { ConfigProviderProps } from 'antd';
import { Button, DatePicker } from 'antd';
import { EditFilled } from '@ant-design/icons';
import useDebounce from './hook';
import { useRouter } from 'next/navigation';

type SizeType = ConfigProviderProps['componentSize'];

const { RangePicker } = DatePicker;

export default function BoardTitleSearch(props) {
	const { titleSearch, setTitleSearch, refetch } = props;

	const [size, setSize] = useState<SizeType>('middle');
	const router = useRouter();

	const debounceFn = useDebounce((titleSearch) => {
		refetch({ search: titleSearch });
		setTitleSearch(titleSearch);
	}, 800);

	const onChangeTitleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const titleSearch = event.currentTarget.value;
		debounceFn(titleSearch);
	};

	const onClickTitleSearch = () => {
		refetch({ search: titleSearch });
	};

	const onClickBoardWrite = () => {
		router.push(`/boards/new`);
	};

	return (
		<div className="flex w-full max-w-7xl items-center justify-between gap-2">
			<div className="flex w-full gap-2">
				<RangePicker
					className="bg-[#F2F2F2] text-[#d9d9d9]"
					size={size}
					placeholder={['YYYY.MM.DD', 'YYYY.MM.DD']}
					separator={'-'}
				/>
				<input
					className="h-10 w-full max-w-lg rounded-lg border bg-[#F2F2F2] px-4"
					type="text"
					name="search_board_title"
					id="search_board_title"
					placeholder="제목을 입력하세요."
					defaultValue={titleSearch}
					onChange={onChangeTitleSearch}
					onKeyDown={(e) => e.key === 'Enter' && onChangeTitleSearch}
				/>
			</div>
			<div className="flex justify-between gap-4">
				<Button
					color="default"
					variant="solid"
					className="h-10"
					onClick={onClickTitleSearch}
				>
					검색
				</Button>
				<Button
					type="primary"
					icon={<EditFilled />}
					size={size}
					className="h-10"
					onClick={onClickBoardWrite}
				>
					트립토크 작성
				</Button>
			</div>
		</div>
	);
}
