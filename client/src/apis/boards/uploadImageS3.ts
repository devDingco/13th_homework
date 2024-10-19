/** @format */

import { EError } from '@/models/error.type';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { actionHandleError } from '@/utils/actionHandlerError';
import s3Client from '~/config/s3ClientConfig';

export default async function uploadImageS3(images: File[]): Promise<string[]> {
	const uploadPromises = images.map(async (image: File) => {
		const Key: string = `${Date.now()}-${image.name}`;

		const uploadParams = {
			Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
			Key,
			Body: Buffer.from(await image.arrayBuffer()),
			ContentType: image.type,
		};

		try {
			await s3Client.send(new PutObjectCommand(uploadParams));

			return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${Key}`;
		} catch (error) {
			console.error('Error uploading to S3:', error);
			actionHandleError({}, EError.S3_ERROR);
		}
	});

	const uploadedUrls = await Promise.all(uploadPromises);

	return uploadedUrls.filter((url): url is string => !!url);
}
