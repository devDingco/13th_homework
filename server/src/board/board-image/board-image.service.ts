import * as AWS from 'aws-sdk';

import { BadRequestException, Injectable } from '@nestjs/common';

import { s3 } from 'configs/aws-s3.config';

@Injectable()
export class BoardImageService {
    private s3: AWS.S3;

    constructor() {
        this.s3 = s3;
    }

    async uploadImageToS3(
        file: Express.Multer.File,
        folder: string,
    ): Promise<string> {
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${folder}/${Date.now()}-${file.originalname}`, // 파일 이름 설정 -> 이 키가 나중에 url의 일부가 됨.
            Body: file.buffer, // 메모리 스토리지에 저장된 파일의 바이너리 데이터
            ContentType: file.mimetype, // 파일 MIME 타입 설정
            ACL: 'public-read', // S3에서 공개 읽기 권한 설정
        };
        // s3로 이미지 올리는 로직
        try {
            const result = await this.s3.upload(uploadParams).promise();
            return result.Location; // 업로드된 파일의 URL 반환
        } catch (error) {
            throw new BadRequestException('image dont save because of ', error);
        }
    }
}
