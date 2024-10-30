'use client';

import Image from 'next/image';
import { CiBookmark } from 'react-icons/ci';
import CommentWrite from '../boards-detail/comment-write';
import {
	DeleteOutlined,
	EnvironmentOutlined,
	LinkOutlined,
} from '@ant-design/icons';
import h from '@/assets/h.png';
import { Divider } from 'antd';
import chatImage from '@/assets/chat.png';

export default function ProductDetail(props) {
	return (
		<div className="flex w-full max-w-7xl flex-col gap-10">
			<header className="flex h-24 w-full flex-col gap-2">
				<div className="flex justify-between">
					<h1 className="text-[28px] font-bold">포항: 숙박권 명</h1>
					<div className="flex items-center justify-center gap-4">
						<DeleteOutlined />
						<LinkOutlined />
						<EnvironmentOutlined />
						<button className="flex h-[32px] w-[53px] items-center justify-center gap-1 rounded-lg bg-black bg-opacity-40 text-white shadow-md shadow-black/25">
							<CiBookmark className="text-[24px]" />
							23
						</button>
					</div>
				</div>
				<span className="font-medium text-[#777777]">부제목</span>
				<div>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
					<span className="font-medium text-[#2974E5]">#해시태그</span>
				</div>
			</header>
			<main className="flex gap-6">
				<div className="flex flex-col gap-10">
					<div className="flex h-[480px] w-full gap-6">
						<Image
							src={'https://placehold.co/640x480'}
							alt="640x480"
							width={640}
							height={480}
						/>
						<Image
							src={'https://placehold.co/180x480'}
							alt="180x480"
							width={180}
							height={480}
						/>
					</div>
					<Divider className="h-[1px] bg-[#D4D3D3]" />
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-bold text-black">상세 설명</h2>
						<article>
							살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고
							쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라
							새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라
							리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래 가던 새
							본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리 얄라셩
							얄라리 얄라 이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌 오리도 가리도
							업슨 바므란 ᄯᅩ 엇디 호리라 얄리얄리 얄라셩 얄라리 얄라 어듸라
							더디던 돌코 누리라 마치던 돌코 믜리도 괴리도 업시 마자셔 우니노라
							얄리얄리 얄라셩 얄라리 얄라 살어리 살어리랏다 바ᄅᆞ래 살어리랏다
							ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다 얄리얄리 얄라셩 얄라리
							얄라 가다가 가다가 드로라 에졍지 가다가 드로라 사ᄉᆞ미 지ᇝ대예
							올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라 얄리얄리 얄라셩 얄라리 얄라
							가다니 ᄇᆡ브른 도긔 설진 강수를 비조라 조롱곳 누로기 ᄆᆡ와
							잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고 얄리얄리 얄라셩 얄라리 얄라
						</article>
					</div>
					<Divider className="h-[1px] bg-[#D4D3D3]" />
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-bold text-black">상세 설명</h2>
						<Image
							src={'https://placehold.co/844x280'}
							alt="지도"
							width={844}
							height={280}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<div className="flex w-[412px] flex-col gap-5 rounded-lg border p-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-2xl font-bold text-black">32,500 원</h1>
							<ul className="list-disc pl-5 text-sm text-[#5F5F5F]">
								<li>
									숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
								</li>
								<li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
							</ul>
						</div>
						<button className="h-[52px] rounded-lg bg-[#2974E5] text-xl font-semibold text-white">
							구매하기
						</button>
					</div>
					<div className="flex flex-col gap-3 rounded-lg bg-[#F2F2F2] p-6">
						<div className="font-bold text-black">판매자</div>
						<div className="flex items-center gap-2">
							<Image src={h} alt="판매자프로필" width={40} height={40} />
							<div>판매자 이름</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="flex w-full max-w-7xl flex-col gap-6">
				<div className="flex gap-2">
					<Image src={chatImage} alt="댓글이미지" />
					<div>문의하기</div>
				</div>
				<div className="flex flex-col items-end gap-4">
					<textarea
						className="h-36 w-full resize-none rounded-lg border px-4 py-3"
						placeholder="문의사항을 입력해 주세요."
					></textarea>
					<button className="h-12 rounded-lg bg-black px-4 py-3 text-white">
						문의 하기
					</button>
				</div>
			</footer>
		</div>
	);
}
