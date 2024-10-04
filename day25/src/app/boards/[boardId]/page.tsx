"use client";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

const IMAGE_SRC = {
	profileImage: {
		src: require("./_components/profile_image.png"),
		alt: "프로필이미지",
	},
	linkImage: {
		src: require("./_components/link.png"),
		alt: "링크아이콘",
	},
	locationImage: {
		src: require("./_components/location.png"),
		alt: "위치아이콘",
	},
	cheongsanImage: {
		src: require("./_components/cheongsan.png"),
		alt: "청산사진",
	},
	youtubeImage: {
		src: require("./_components/cheongsan.png"),
		alt: "유튜브사진",
	},
	badImage: {
		src: require("./_components/bad.png"),
		alt: "싫어요",
	},
	goodImage: {
		src: require("./_components/good.png"),
		alt: "좋아요",
	},
	hamberger: {
		src: require("./_components/hamburger.png"),
		alt: "목록아이콘",
	},
	pencil: {
		src: require("./_components/pencil.png"),
		alt: "수정아이콘",
	},
} as const;

const FETCH_BOARD = gql`
	query fetchBoard($boardId: ID!) {
		fetchBoard(boardId: $boardId) {
			_id
			writer
			title
			contents
			youtubeUrl
			likeCount
			dislikeCount
			images
			user {
				_id
				email
				name
				picture
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export default function BoardsDetailPage() {
	const params = useParams();
	const id = params.boardId;

	const { data } = useQuery(FETCH_BOARD, {
		variables: { boardId: id },
	});

	return (
		<div className={styles.detailLayout}>
			<div className={styles.detailBody}>
				<div className={styles.detailFrame}>
					<div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
					<div className={styles.detailMetadataContainer}>
						<div className={styles.detailMetadataProfile}>
							<Image
								src={IMAGE_SRC.profileImage.src}
								alt={IMAGE_SRC.profileImage.alt}
							/>
							<div> {data?.fetchBoard?.writer}</div>
						</div>
						<div className={styles.detailMetadataDate}>
							{data?.fetchBoard?.createdAt}
						</div>
					</div>
					<div className={styles.enrollBorder}></div>
					<div className={styles.detailMetadataIconContainer}>
						<Image
							src={IMAGE_SRC.linkImage.src}
							alt={IMAGE_SRC.linkImage.alt}
						/>
						<Image
							src={IMAGE_SRC.locationImage.src}
							alt={IMAGE_SRC.locationImage.alt}
						/>
					</div>
					<div className={styles.detailContentContainer}>
						<Image
							src={IMAGE_SRC.cheongsanImage.src}
							alt={IMAGE_SRC.cheongsanImage.alt}
							className={styles.detailContentImage}
						/>
						<div className={styles.detailContentText}>
							{data?.fetchBoard?.contents}
						</div>
						<Image
							src={IMAGE_SRC.cheongsanImage.src}
							alt={IMAGE_SRC.cheongsanImage.alt}
						/>
						<div className={styles.detailContentGoodOrBad}>
							<div className={styles.detailGoodContainer}>
								<Image
									src={IMAGE_SRC.badImage.src}
									alt={IMAGE_SRC.badImage.alt}
								/>
								<div className={styles.detailBadText}>24</div>
							</div>
							<div className={styles.detailGoodContainer}>
								<Image
									src={IMAGE_SRC.goodImage.src}
									alt={IMAGE_SRC.goodImage.alt}
								/>
								<div className={styles.detailGoodText}>12</div>
							</div>
						</div>
						<div className={styles.detailButtonsContainer}>
							<button className={styles.detailButton}>
								<Image
									src={IMAGE_SRC.hamberger.src}
									alt={IMAGE_SRC.hamberger.alt}
								/>
							</button>
							<Link
								href={`/boards/${id}/edit`}
								className={styles.detailButton}
							>
								<Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
