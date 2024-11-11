import * as multerS3 from 'multer-s3';

import { ConfigService } from '@nestjs/config';
import s3 from './aws-s3.config';

const configService = new ConfigService();

export const multerOptions = {
    storage: multerS3({
        s3: s3,
        bucket: configService.get<string>('AWS_S3_BUCKET_NAME'),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `sub/${Date.now()}_${file.originalname}`);
        },
    }),
};
