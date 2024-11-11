import {
    Controller,
    InternalServerErrorException,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'configs/multer.config';
import { uploadFile } from 'src/common/types/upload-file.interface';

@Controller('/api/upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('image', multerOptions))
    uploadFile(@UploadedFile() image: uploadFile) {
        if (!image) {
            throw new InternalServerErrorException(
                '이미지를 s3에 성공적으로 저장하지 못했습니다.',
            );
        }
        if (image) return image.location;
    }
}
