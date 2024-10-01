"use client";

import styles from "./styles.module.css";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";

interface BoardType {
	createdAt: Date;
	title: string;
	writer: string;
	__typename: string;
	_id: string;
}

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
	const { data, loading } = useQuery(FETCH_BOARDS);
	const [deleteBoard] = useMutation(DELETE_BOARD);

	const onClickDeleteBoard = (id: string) => {
		deleteBoard({
			variables: { id },
			refetchQueries: [{ query: FETCH_BOARDS }],
		});
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
				{data?.fetchBoards.map((board: BoardType, index: number) => (
					<div className={styles.list} key={board._id}>
						<div className={styles.number}>{index + 1}</div>
						<div className={styles.title}>{board.title}</div>
						<div className={styles.writer}>{board.writer}</div>
						<div className={styles.date}>
							{new Date(board.createdAt).toLocaleDateString()}
						</div>
						<div className={styles.delete}>
							<button onClick={() => onClickDeleteBoard(board._id)}>
								삭제이미지
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
