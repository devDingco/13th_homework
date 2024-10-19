/** @format */

import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '~/config/s3ClientConfig';

export default async function uploadImageS3(files: File[]): Promise<string[]> {
	const uploadPromises = files.map(async (file: File) => {
		const fileKey = `${Date.now()}-${file.name}`;

		const uploadParams = {
			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			Key: fileKey,
			Body: Buffer.from(await file.arrayBuffer()),
			ContentType: file.type,
		};

		try {
			await s3Client.send(new PutObjectCommand(uploadParams));

			return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
		} catch (error) {
			console.error('Error uploading to S3:', error);
			throw new Error('이미지 업로드 실패');
		}
	});

	const uploadedUrls = await Promise.all(uploadPromises);

	return uploadedUrls;
}
