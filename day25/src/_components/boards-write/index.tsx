"use client";

import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";

interface BoardsWriteProps {
    isEdit: boolean;  // isEdit 타입 정의
    data?: any;  // Edit 시 전달되는 data가 있을 경우 처리
}

const IMAGE_SRC = {
	addImage: {
		src: require("@assets/add_image.png"),
		alt: "사진추가이미지",
	},
};

const 나의그래프큐엘셋팅 = gql`
	mutation createBoard($createBoardInput: CreateBoardInput!) {
		createBoard(createBoardInput: $createBoardInput) {
			_id
			writer
			title
			contents
			youtubeUrl
			likeCount
			images
			boardAddress {
				zipcode
				address
				addressDetail
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

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

export default function BoardsWrite({ isEdit, data }: BoardsWriteProps) {
	const [name, setName] = useState(isEdit ? data?.fetchBoard.name : "");
	const [password, setPassword] = useState(
		isEdit ? data?.fetchBoard.password : ""
	);
	const [title, setTitle] = useState(
		isEdit ? data?.fetchBoard.title : ""
	);
	const [content, setContent] = useState(
		isEdit ? data?.fetchBoard.content : ""
	);

	const [nameError, setNameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [titleError, setTitleError] = useState("");
	const [contentError, setContentError] = useState("");

	const isButtonDisabled = !name || !password || !title || !content;

	const [createBoard] = useMutation(나의그래프큐엘셋팅);

	const router = useRouter();
	const params = useParams();
	const id = params.boardId;

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		let hasError = false;

		if (name.trim() === "") {
			setNameError("필수입력 사항입니다.");
			hasError = true;
		} else {
			setNameError("");
		}

		if (password.length === 0) {
			setPasswordError("필수입력 사항입니다.");
			hasError = true;
		} else {
			setPasswordError("");
		}

		if (title.trim() === "") {
			setTitleError("필수입력 사항입니다.");
			hasError = true;
		} else {
			setTitleError("");
		}

		if (content.trim() === "") {
			setContentError("필수입력 사항입니다.");
			hasError = true;
		} else {
			setContentError("");
		}

		if (!hasError) {
			const { data } = await createBoard({
				variables: {
					createBoardInput: {
						writer: name,
						password: password,
						title: title,
						contents: content,
						youtubeUrl: "",
						boardAddress: {
							zipcode: "",
							address: "",
							addressDetail: "",
						},
						images: ["", ""],
					},
				},
			});

			console.log("data", data);
			alert("게시글이 등록되었습니다!");
			router.push(`/boards/${data.createBoard._id}`);
		}

		event.preventDefault();
		try {
			if (isEdit === false) {
				const { data } = await createBoard({
					variables: {
						createBoardInput: {
							writer: name,
							password: password,
							title: title,
							contents: content,
							youtubeUrl: "",
							boardAddress: {
								zipcode: "",
								address: "",
								addressDetail: "",
							},
							images: ["", ""],
						},
					},
				});
				router.push(`/boards/${data.createBoard._id}`);
			} else if (isEdit === true) {
				const newPw = prompt("비밀번호를 입력하세요");
				const { data } = useQuery(FETCH_BOARD, {
					variables: {
						updateBoardInput: {
							title: title,
							contents: content,
						},
						password: newPw,
						boardId: params.postId,
					},
				});
				router.push(`/boards/${params.postId}`);
			}
		} catch (err: any) {
			alert(err.graphQLErrors[0].message);
		}
	};

	return (
		<div className={styles.layout}>
			<div className={styles["enroll-subject"]}>
				<div className={styles["enroll-subject-text"]}>게시물 등록</div>
			</div>
			<div className={styles["enroll-row-container"]}>
				<div className={styles["enroll-row-section"]}>
					<div className={styles["enroll-row-flex"]}>
						<div className={styles["flex-half"]}>
							<div className={styles["enroll-form-title"]}>
								<div>작성자 </div>
								<div className={styles["enroll-required-indicator"]}> *</div>
							</div>
							<input
								value={name}
								type="text"
								placeholder="작성자 명을 입력해 주세요."
								className={styles["enroll-input"]}
								onChange={onChangeName}
								disabled={isEdit}
							/>
							<div className={styles["error-msg"]}>{nameError}</div>
						</div>
						<div className={styles["flex-half"]}>
							<div className={styles["enroll-form-title"]}>
								<div>비밀번호</div>
								<div className={styles["enroll-required-indicator"]}> *</div>
							</div>
							<input
								type="password"
								placeholder="비밀번호를 입력해 주세요."
								className={styles["enroll-input"]}
								onChange={onChangePassword}
								disabled={isEdit}
							/>
							<div className={styles["error-msg"]}>{passwordError}</div>
						</div>
					</div>
				</div>

				<div className={styles["enroll-border"]}></div>

				<div className={styles["enroll-row-section"]}>
					<div className={styles["enroll-form-title"]}>
						<div>제목</div>
						<div className={styles["enroll-required-indicator"]}> *</div>
					</div>
					<input
						value={title}
						type="text"
						className={styles["enroll-input"]}
						placeholder="제목을 입력해 주세요."
						onChange={onChangeTitle}
					/>
					<div className={styles["error-msg"]}>{titleError}</div>
				</div>
				<div className={styles["enroll-border"]}></div>
				<div className={styles["enroll-row-section"]}>
					<div className={styles["enroll-form-title"]}>
						<div>내용</div>
						<div className={styles["enroll-required-indicator"]}> *</div>
					</div>
					<textarea
						value={content}
						placeholder="내용을 입력해 주세요."
						className={`${styles["enroll-input"]} ${styles["enroll-textarea"]}`}
						onChange={onChangeContent}
					></textarea>
					<div className={styles["error-msg"]}>{contentError}</div>
				</div>
				<div className={styles["enroll-row-section"]}>
					<div className={styles["enroll-form-title"]}>
						<div>주소</div>
					</div>
					<div className={styles["enroll-address-firstrow"]}>
						<input
							type="number"
							className={styles["zipcode-input"]}
							placeholder="12345"
						/>
						<button className={styles["zipcode-search-button"]}>
							우편번호 검색
						</button>
					</div>

					<input
						placeholder="주소를 입력해주세요."
						className={styles["enroll-input"]}
						type="text"
					/>
					<input
						placeholder="상세주소"
						className={styles["enroll-input"]}
						type="text"
					/>
				</div>
				<div className={styles["enroll-border"]}></div>
				<div className={styles["enroll-row-section"]}>
					<div className={styles["enroll-form-title"]}>
						<div>유튜브 링크</div>
					</div>
					<input
						className={styles["enroll-input"]}
						placeholder="링크를 입력해 주세요."
					/>
				</div>

				<div className={styles["enroll-border"]}></div>

				<div className={styles["enroll-row-section"]}>
					<div>사진 첨부</div>
					<div className={styles["picture-enroll-row"]}>
						<Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
						<Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
						<Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
					</div>
				</div>
			</div>
			<div className={styles["enroll-button-container"]}>
				<button className={styles["enroll-cancel-button"]}>취소</button>
				<button
					className={
						isButtonDisabled
							? `${styles["enroll-submit-button"]} ${styles["disabled"]}`
							: styles["enroll-submit-button"]
					}
					onClick={onClickSubmit}
					disabled={isButtonDisabled}
				>
					등록하기
				</button>
			</div>
		</div>
	);
}
