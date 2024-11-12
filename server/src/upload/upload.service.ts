import { FileUpload } from 'graphql-upload';
import { Upload } from '@aws-sdk/lib-storage';
import s3 from 'configs/aws-s3.config';

export async function uploadFileToS3(image: FileUpload): Promise<string> {
    const { createReadStream, filename, mimetype } = await image;

    const stream = createReadStream();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const Key: string = `${Date.now()}-${filename}`;

    const uploadParams = {
        Bucket: bucketName,
        Key,
        Body: stream,
        ContentType: mimetype,
    };

    try {
        const upload = new Upload({
            client: s3,
            params: {
                Bucket: bucketName,
                Key,
                Body: createReadStream(),
                ContentType: mimetype,
            },

            queueSize: 4,
            partSize: 5 * 1024 * 1024,
        });

        await upload.done();
        console.log(`File uploaded successfully to ${bucketName}/${Key}`);
        return `https://${bucketName}.s3.amazonaws.com/${Key}`;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error('파일 업로드 중 오류가 발생했습니다.');
    }
}
