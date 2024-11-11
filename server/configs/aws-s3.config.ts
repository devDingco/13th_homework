import * as dotenv from 'dotenv';

import { S3Client } from '@aws-sdk/client-s3';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

console.log('AWS_REGION:', process.env.AWS_REGION);

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export default s3;
