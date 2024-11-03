'use client';

import chatImage from '@/assets/chat.png';
import { gql, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { FETCH_TRAVEL_PRODUCT_QUESTIONS } from '../product-question-list';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import PROFILE_IMG from '@/assets/profile.png';

const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
	mutation createTravelproductQuestion(
		$createTravelproductQuestionInput: CreateTravelproductQuestionInput!
		$travelproductId: ID!
	) {
		createTravelproductQuestion(
			createTravelproductQuestionInput: $createTravelproductQuestionInput
			travelproductId: $travelproductId
		) {
			__typename
			_id
			contents
			user {
				__typename
				_id
				email
				name
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export default function ProductQuestion(props) {
	const params = useParams();
	const travelproductId = params?.travelproductId || '';
	const [contents, setContents] = useState('');
	const [createTravelproductQuestion] = useMutation(
		CREATE_TRAVEL_PRODUCT_QUESTION,
	);

	const onChangeProductQuestion = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContents(event.currentTarget.value);
	};

	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		try {
			const result = await createTravelproductQuestion({
				variables: {
					createTravelproductQuestionInput: { contents },
					travelproductId,
				},
				refetchQueries: [FETCH_TRAVEL_PRODUCT_QUESTIONS],
			});
			Modal.success({ content: '문의 내역이 성공적으로 등록되었습니다.' });
		} catch (error) {
			Modal.error({
				content: '문의하기에 실패하였습니다. 고객센터에 문의해주세요.',
			});
		}
	};

	return (
		<div className="flex w-full max-w-7xl flex-col gap-6">
			<div className="flex gap-2">
				<Image src={chatImage} alt="댓글이미지" />
				<div>문의하기</div>
			</div>
			<div className="flex flex-col items-end gap-4">
				<textarea
					className="h-36 w-full resize-none rounded-lg border px-4 py-3"
					placeholder="문의사항을 입력해 주세요."
					defaultValue={contents}
					onChange={onChangeProductQuestion}
				></textarea>
				<button
					className="h-12 rounded-lg bg-black px-4 py-3 text-white"
					onClick={onSubmit}
				>
					문의 하기
				</button>
			</div>
		</div>
	);
}
