/** @format */
'use client';

import { useLoginMutation } from '@/graphql/mutations/login/login.generated';
import { useState } from 'react';

export default function Page() {
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

	const [loginMutation] = useLoginMutation();

	const onClickLogin = async () => {
		const res = await loginMutation({
			variables: {
				loginUser: {
					email: '12r3rrr444d555444454dd44454@naver.com',
					password: '1234444555@fA',
				},
			},
		});
		console.log(res);
	};

	return (
		<div className="flex flex-col gap-10">
			<input
				type="text"
				className="border-[1px] border-black"
				onChange={(event) => setId(event.target.value)}
			/>
			<input
				type="text"
				className="border-[1px] border-black"
				onChange={(event) => setPw(event.target.value)}
			/>
			<button className="border-[1px] border-black py-4" onClick={onClickLogin}>
				클릭
			</button>
		</div>
	);
}
