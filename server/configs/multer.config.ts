import * as multerS3 from 'multer-s3';

import s3 from './aws-s3.config';

export const multerOptions = {
    storage: multerS3({
        s3: s3,
        bucket: 'sesac',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `sub/${Date.now()}_${file.originalname}`);
        },
    }),
};
