import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
	const [writer, setWriter] = useState("");
	const [writerError, setWriterError] = useState("");
	const [pw, setPw] = useState("");
	const [pwError, setPwError] = useState("");
	const [title, setTitle] = useState("");
	const [titleError, setTitleError] = useState("");
	const [content, setContent] = useState("");
	const [contentError, setContentError] = useState("");
	const [addressNumber, setAddressNumber] = useState("");
	const [address, setAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [youtube, setYoutube] = useState("");
	const submit = () => {
		if (writer === "") {
			setWriterError(true);
		}
		if (pw === "") {
			setPwError(true);
		}
		if (title === "") {
			setTitleError(true);
		}
		if (content === "") {
			setContentError(true);
		}
	};

	return (
		<div className="layout">
			<div className="enroll-subject">
				<div className="enroll-subject-text">게시물 등록</div>
			</div>
			<div className="enroll-row-container">
				<div className="enroll-row-section">
					<div className="enroll-row-flex">
						<div className="flex-half">
							<div className="enroll-form-title">
								<div>작성자 </div>
								<div className="enroll-required-indicator"> *</div>
							</div>
							<input
								type="text"
								className="enroll-input"
								placeholder="작성자명을 입력해주세요."
								value={writer}
								onChange={(e) => setWriter(e.target.value)}
							/>
							{writerError && (
								<div className="error-message">필수 입력 사항입니다.</div>
							)}
						</div>
						<div className="flex-half">
							<div className="enroll-form-title">
								<div>비밀번호</div>
								<div className="enroll-required-indicator"> *</div>
							</div>
							<input
								type="password"
								className="enroll-input"
								placeholder="비밀번호를 입력해주세요."
								value={pw}
								onChange={(e) => setPw(e.target.value)}
							/>
							{pwError && (
								<div className="error-message">필수 입력 사항입니다.</div>
							)}
						</div>
					</div>
				</div>

				<div className="enroll-border"></div>

				<div className="enroll-row-section">
					<div className="enroll-form-title">
						<div>제목</div>

						<div className="enroll-required-indicator"> *</div>
					</div>
					<input
						placeholder="제목을 입력해 주세요."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="enroll-input"
					/>
					{titleError && (
						<div className="error-message">필수 입력 사항입니다.</div>
					)}
				</div>
				<div className="enroll-border"></div>
				<div className="enroll-row-section">
					<div className="enroll-form-title">
						<div>내용</div>
						<div className="enroll-required-indicator"> *</div>
					</div>
					<textarea
						placeholder="내용을 입력해 주세요."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="enroll-input enroll-textarea"
					></textarea>
					{contentError && (
						<div className="error-message">필수 입력 사항입니다.</div>
					)}
				</div>
				<div className="enroll-row-section">
					<div className="enroll-form-title">
						<div>주소</div>
					</div>
					<div className="enroll-address-firstrow">
						<input
							text="number"
							className="zipcode-input"
							placeholder="01234"
							value={addressNumber}
							onChange={(e) => setAddressNumber(e.target.value)}
						/>
						<button className="zipcode-search-button">우편번호 검색</button>
					</div>

					<input
						placeholder="주소를 입력해주세요."
						className="enroll-input"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<input
						placeholder="상세주소"
						className="enroll-input"
						type="text"
						onChange={(e) => detailAddress(e.target.value)}
					/>
				</div>
				{/* border */}
				<div className="enroll-border"></div>
				<div className="enroll-row-section">
					<div className="enroll-form-title">
						<div>유튜브 링크</div>
					</div>
					<input
						className="enroll-input"
						placeholder="링크를 입력해 주세요."
						value={youtube}
						onChange={(e) => setYoutube(e.target.value)}
					/>
				</div>

				{/* border */}
				<div className="enroll-border"></div>

				<div className="enroll-row-section">
					<div>사진 첨부</div>
					<div className="picture-enroll-row">
						{/* <img src="../public/add_image.png" />
						<img src="../public/add_image.png" />
						<img src="../public/add_image.png" /> */}
					</div>
				</div>
			</div>
			<div className="enroll-button-container">
				<button className="enroll-cancel-button">취소</button>
				<button onClick={submit} className="enroll-submit-button">
					등록하기
				</button>
			</div>
		</div>
	);
}

export default App;
