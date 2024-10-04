"use client";

import styles from "./styles.module.css";
import { useState, MouseEvent } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BoardType {
	createdAt: Date;
	title: string;
	writer: string;
	__typename: string;
	_id: string;
}

const IMAGE_SRC = {
	deleteImage: {
		src: require("./delete.png"),
		alt: "삭제버튼",
	},
};

const FETCH_BOARDS = gql`
	query {
		fetchBoards {
			_id
			title
			writer
			createdAt
		}
	}
`;

const DELETE_BOARD = gql`
	mutation ($id: ID!) {
		deleteBoard(boardId: $id)
	}
`;

export default function BoardList() {
	const [hoveredId, setHoveredId] = useState("");
	const { data, loading } = useQuery(FETCH_BOARDS);
	const [deleteBoard] = useMutation(DELETE_BOARD);

	const onClickDeleteBoard = (id: string) => {
		deleteBoard({
			variables: { id },
			refetchQueries: [{ query: FETCH_BOARDS }],
		});
	};
	const router = useRouter();
	const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		try {
			const response = await deleteBoard({
				variables: { boardId: hoveredId },
				refetchQueries: [{ query: FETCH_BOARDS }],
			});
			console.log("삭제 성공:", response.data.deleteBoard);
		} catch (err) {
			console.error("삭제실패");
		}
	};

	const onClickDetail = async (
		event: MouseEvent<HTMLButtonElement>,
		id: String
	) => {
		event.stopPropagation();

		router.push(`/boards/${id}`);
	};
	if (loading) return <p>Loading...</p>;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.index}>
					<div className={styles.index_text}>번호</div>
					<div className={styles.index_text}>제목</div>
					<div className={styles.index_text}>작성자</div>
					<div className={styles.index_text}>날짜</div>
				</div>
				<div className={styles.listContainer}>
					{data?.fetchBoards.map((board: BoardType, index: number) => (
						<button
							className={styles.list}
							key={board._id}
							onClick={(event) => onClickDetail(event, board?._id)}
						>
							<div className={styles.number}>{index + 1}</div>
							<div className={styles.title}>{board.title}</div>
							<div className={styles.writer}>{board.writer}</div>
							<div className={styles.date}>
								{new Date(board.createdAt).toLocaleDateString()}
							</div>
							<div className={styles.delete}>
								<button onClick={() => onClickDeleteBoard(board._id)}>
									<Image
										src={IMAGE_SRC.deleteImage.src}
										alt={IMAGE_SRC.deleteImage.alt}
									/>
								</button>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
