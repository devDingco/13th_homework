/** @format */

import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: process.env.NEXT_PUBLIC_AWS_REGION as string,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
	},
});

export default s3Client;
