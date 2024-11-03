/** @format */

export enum EError {
	REQUIRED = '필수입력 사항입니다.',
	SIZE_TYPE = '이미지 형식이나 크기가 유효하지 않습니다.',
	RESOLUTION = '이미지 해상도가 너무 낮습니다.',
	SERVER = '서버에서 오류가 발생했습니다. 다시 시도해주세요.',
	S3_ERROR = '외부 이미지 저장소에서 오류가 발생했습니다.',
	DB_ERROR = '정상적으로 데이터가 저장되지 않았습니다.',
}
