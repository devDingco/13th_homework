'use client';

import { useAccessTokenStore } from '@/commons/stores/access-token-store';
import {
	CaretDownOutlined,
	CaretUpOutlined,
	LogoutOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Modal, Space, Select, Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import profile from '@/assets/profile.png';
import logo from '@/assets/logo.png';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { gql, useMutation, useQuery } from '@apollo/client';
import { FetchUserLoggedInDocument } from '@/commons/graphql/graphql';
import { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { v4 as uuidv4 } from 'uuid';

const DynamicMenu = dynamic(() => import('antd').then((mod) => mod.Menu), {
	ssr: false,
});

const dynamicMenuItems = [
	{
		label: (
			<Link href={'/'}>
				<Image src={logo} alt="트립트립로고" width={52} height={32} />
			</Link>
		),
		key: '트립토크로고',
	},
	{ label: <Link href={'/boards'}>트립토크</Link>, key: '트립토크' },
	{ label: <Link href={'/products'}>숙박권 구매</Link>, key: '숙박권구매' },
	{ label: <Link href={'/mypage'}>마이페이지</Link>, key: '마이페이지' },
	{ label: <Link href={'/openapis'}>오픈API 컨텐츠</Link>, key: '오픈API' },
	{ label: <Link href={'/myapis'}>나만의API 컨텐츠</Link>, key: '나만의API' },
];

const LOGOUT_USER = gql`
	mutation logoutUser {
		logoutUser
	}
`;

const CREATE_POINT_TRANSACTIONS_OF_LOADING = gql`
	mutation createPointTransactionOfLoading($paymentId: ID!) {
		createPointTransactionOfLoading(paymentId: $paymentId) {
			_id
			impUid
			amount
			balance
			status
			statusDetail
			user {
				_id
				email
				name
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export default function Navigation() {
	const router = useRouter();
	const { data: userLoggedIn } = useQuery(FetchUserLoggedInDocument);
	const [createPointTransactionsOfLoading] = useMutation(
		CREATE_POINT_TRANSACTIONS_OF_LOADING,
	);

	const { accessToken, setAccessToken } = useAccessTokenStore();
	const [dropped, isDropped] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedAmount, setSelectedAmount] = useState(0);
	const [logoutUser] = useMutation(LOGOUT_USER);

	const onClickLoginButton = () => router.push('/login');
	const showModal = () => setIsOpen(true);
	const handleCancel = () => setIsOpen(false);

	const onClickLogout = async () => {
		try {
			await logoutUser();
			setAccessToken(null);
			router.push('/login'); // 로그아웃 후 로그인 페이지로 이동
		} catch (error) {
			if (error instanceof Error) console.error('로그아웃 실패:', error);
		}
	};

	const handleOk = async () => {
		if (!selectedAmount) {
			alert('충전할 금액을 선택해주세요.');
			return;
		}

		try {
			// paymentId 생성
			const paymentId = uuidv4();
			// 결제 요청
			await onClickPayment(paymentId);
		} catch (error) {
			if (error instanceof Error) console.error('결제 실패:', error);
		} finally {
			// 결제 요청 완료 후 모달 닫기
			setIsOpen(false);
			isDropped(false);
		}
	};

	const onClickPayment = async (paymentId: string) => {
		try {
			const rsp = await PortOne.requestPayment({
				storeId: 'store-abc39db7-8ee1-4898-919e-0af603a68317',
				paymentId: paymentId, // uuid로 생성한 paymentId 사용
				orderName: '충전 포인트', // 주문명
				totalAmount: +selectedAmount, // 충전할 금액
				currency: 'CURRENCY_KRW', // KRW(원화)로 설정
				channelKey: 'channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33',
				payMethod: 'EASY_PAY',
				customer: {
					fullName: userLoggedIn?.fetchUserLoggedIn.name, // 고객 이름
					email: userLoggedIn?.fetchUserLoggedIn.email, // 고객 이메일
				},
				redirectUrl: 'http://localhost:3000/mypage', // 결제 후 리디렉션 URL
			});
			// 결제 성공 시 응답 출력
			console.log(rsp);
			// 결제 성공 여부 확인
			if (rsp?.code || rsp?.message) {
				console.log('결제가 취소되었거나 실패했습니다.');
			} else {
				// 결제가 성공한 경우에만 포인트 트랜잭션 뮤테이션 실행
				await createPointTransactionsOfLoading({ variables: { paymentId } });
			}
		} catch (error) {
			console.error('결제 요청 실패:', error); // 결제 실패 시 로직
		}
	};

	const items: MenuProps['items'] = [
		{ type: 'divider' },
		{
			label: (
				<div>
					{userLoggedIn?.fetchUserLoggedIn.userPoint?.amount.toLocaleString()}원
				</div>
			),
			key: '0',
		},
		{ type: 'divider' },
		{
			label: <div>포인트 충전</div>,
			key: '1',
			onClick: showModal,
		},
		{
			label: (
				<div className="flex gap-2">
					<LogoutOutlined />
					로그아웃
				</div>
			),
			key: '2',
			onClick: onClickLogout,
		},
	];

	return (
		<div className="flex w-full max-w-7xl items-center justify-between bg-white p-4">
			<DynamicMenu
				className="flex-1 border-none"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={dynamicMenuItems}
				theme="light"
			/>
			{accessToken ? (
				<div className="flex items-center gap-2">
					<Dropdown
						trigger={['click']}
						overlayClassName="w-60"
						menu={{ items }}
					>
						<a onClick={(e) => e.preventDefault()}>
							<div
								className="flex items-center gap-2"
								onClick={() => isDropped((pre) => !pre)}
							>
								<Image
									src={profile}
									alt="프로필이미지"
									className="h-8 w-8 rounded-full"
								/>
								<Space>{userLoggedIn?.fetchUserLoggedIn.name}</Space>
								{dropped ? <CaretUpOutlined /> : <CaretDownOutlined />}
							</div>
						</a>
					</Dropdown>
					{/* 금액 선택 모달 */}
					<Modal
						title="포인트 충전"
						open={isOpen}
						onOk={handleOk}
						okText="포인트 충전하기"
						cancelText="취소"
						onCancel={handleCancel}
					>
						<p>충전할 금액을 선택하세요:</p>
						<Select
							style={{ width: '100%' }}
							placeholder="금액 선택"
							onChange={(value) => setSelectedAmount(value)}
						>
							<Select.Option value={1000}>1,000원</Select.Option>
							<Select.Option value={5000}>5,000원</Select.Option>
							<Select.Option value={10000}>10,000원</Select.Option>
							<Select.Option value={50000}>50,000원</Select.Option>
						</Select>
					</Modal>
				</div>
			) : (
				<button
					className="flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white"
					onClick={onClickLoginButton}
				>
					로그인
					<RightOutlined />
				</button>
			)}
		</div>
	);
}
