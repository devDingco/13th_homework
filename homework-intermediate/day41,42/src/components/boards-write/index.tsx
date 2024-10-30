'use client';
import styles from './styles.module.css';
import Image from 'next/image';
import useBoardWrite from './hook';
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { FetchBoardQuery } from '@/commons/graphql/graphql';
import UploadImage from './upload-image';
import { useState } from 'react';

export interface IBoardWriteProps {
	isEdit: boolean;
	data?: FetchBoardQuery;
}

export default function BoardWrite(props: IBoardWriteProps) {
	const {
		inputs,
		password,
		isButtonDisabled,
		zipcode,
		address,
		detailedAddress,
		youtubeUrl,
		isModalOpen,
		nameError,
		passwordError,
		titleError,
		contentError,
		imageUrls,
		setImageUrls,
		onChangeInputs,
		onChangePassword,
		onChangeYoutubeUrl,
		onChangeDetailedAddress,
		onClickContent,
		onClickSubmit,
		onClickUpdate,
		onToggleZipcodeModal,
		onZipcodeModalComplete,
	} = useBoardWrite(props);

	return (
		<div className={styles.layout}>
			<div className={styles['enroll-subject']}>
				<div className={styles['enroll-subject-text']}>게시물 등록</div>
			</div>
			<div className={styles['enroll-row-container']}>
				<div className={styles['enroll-row-section']}>
					<div className={styles['enroll-row-flex']}>
						<div className={styles['flex-half']}>
							<div className={styles['enroll-form-title']}>
								<div>작성자 </div>
								<div className={styles['enroll-required-indicator']}> *</div>
							</div>
							<input
								type="text"
								id="writer"
								defaultValue={inputs.writer}
								placeholder={'작성자 명을 입력해 주세요.'}
								className={
									props.isEdit
										? styles['enroll-input-disabled']
										: styles['enroll-input']
								}
								onChange={onChangeInputs}
								disabled={props.isEdit ? true : false}
							/>
							<div className={styles['error-msg']}>{nameError}</div>
						</div>
						<div className={styles['flex-half']}>
							<div className={styles['enroll-form-title']}>
								<div>비밀번호</div>
								<div className={styles['enroll-required-indicator']}> *</div>
							</div>
							<input
								type="password"
								id="password"
								defaultValue={password}
								placeholder={'비밀번호를 입력해 주세요.'}
								className={
									props.isEdit
										? styles['enroll-input-disabled']
										: styles['enroll-input']
								}
								onChange={onChangePassword}
								disabled={props.isEdit ? true : false}
							/>
							<div className={styles['error-msg']}>{passwordError}</div>
						</div>
					</div>
				</div>

				<div className={styles['enroll-border']}></div>

				<div className={styles['enroll-row-section']}>
					<div className={styles['enroll-form-title']}>
						<div>제목</div>
						<div className={styles['enroll-required-indicator']}> *</div>
					</div>
					<input
						id="title"
						type="text"
						className={styles['enroll-input']}
						defaultValue={inputs.title}
						placeholder="제목을 입력해 주세요."
						onChange={onChangeInputs}
					/>
					<div className={styles['error-msg']}>{titleError}</div>
				</div>
				<div className={styles['enroll-border']}></div>
				<div className={styles['enroll-row-section']}>
					<div className={styles['enroll-form-title']}>
						<div>내용</div>
						<div className={styles['enroll-required-indicator']}> *</div>
					</div>
					<textarea
						id="contents"
						defaultValue={inputs.contents}
						placeholder="내용을 입력해 주세요."
						className={`${styles['enroll-input']} ${styles['enroll-textarea']} resize-none`}
						onChange={onChangeInputs}
						onClick={props.isEdit ? onClickContent : undefined}
					></textarea>
					<div className={styles['error-msg']}>{contentError}</div>
				</div>
				<div className={styles['enroll-row-section']}>
					<div className={styles['enroll-form-title']}>
						<div>주소</div>
					</div>
					<div className={styles['enroll-address-firstrow']}>
						<input
							type="number"
							className={styles['zipcode-input']}
							placeholder="12345"
							defaultValue={zipcode}
							readOnly
						/>
						<button
							onClick={onToggleZipcodeModal}
							className={styles['zipcode-search-button']}
						>
							우편번호 검색
						</button>
						{isModalOpen && (
							<Modal
								open={isModalOpen}
								onOk={onToggleZipcodeModal}
								onCancel={onToggleZipcodeModal}
								okText="완료"
								cancelText="취소"
							>
								<DaumPostcodeEmbed onComplete={onZipcodeModalComplete} />
							</Modal>
						)}
					</div>

					<input
						placeholder="주소를 입력해주세요."
						className={styles['enroll-input']}
						type="text"
						defaultValue={address}
						readOnly
					/>
					<input
						placeholder="상세주소"
						className={styles['enroll-input']}
						type="text"
						defaultValue={detailedAddress}
						onChange={onChangeDetailedAddress}
					/>
				</div>
				<div className={styles['enroll-border']}></div>
				<div className={styles['enroll-row-section']}>
					<div className={styles['enroll-form-title']}>
						<div>유튜브 링크</div>
					</div>
					<input
						className={styles['enroll-input']}
						placeholder="링크를 입력해 주세요."
						defaultValue={youtubeUrl}
						onChange={onChangeYoutubeUrl}
					/>
				</div>

				<div className={styles['enroll-border']}></div>

				<div className={styles['enroll-row-section']}>
					<div>사진 첨부</div>
					<div className={styles['picture-enroll-row']}>
						{imageUrls.map((url, idx) => (
							<UploadImage
								key={idx}
								idx={idx}
								imageUrl={url}
								setImageUrls={setImageUrls}
							/>
						))}
					</div>
				</div>
			</div>
			<div className={styles['enroll-button-container']}>
				<button className={styles['enroll-cancel-button']}>취소</button>
				<button
					className={
						isButtonDisabled
							? `${styles['enroll-submit-button']} ${styles['disabled']}`
							: styles['enroll-submit-button']
					}
					onClick={props.isEdit ? onClickUpdate : onClickSubmit}
				>
					{props.isEdit ? '수정' : '등록'}하기
				</button>
			</div>
		</div>
	);
}
