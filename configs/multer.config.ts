import { memoryStorage } from 'multer';

export const multerOptions = {
    storage: memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};
