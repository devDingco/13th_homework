import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Res,
    Session,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDTO } from './dto/signUp.dto';
import { loginDTO } from './dto/login.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'configs/multer.config';
import { uploadFile } from 'src/common/types/upload-file.interface';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async signUp(
        @Body() signUpDTO: signUpDTO,
        @Body('address') address,
        @UploadedFile() image: uploadFile,
    ): Promise<boolean> {
        if (!image) {
            throw new InternalServerErrorException(
                '이미지를 s3에 성공적으로 저장하지 못했습니다.',
            );
        }
        if (address) {
            signUpDTO.address = JSON.parse(address);
        }

        const user = await this.userService.createUser({
            ...signUpDTO,
            image: image.location,
        });

        if (user) return true;
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDTO: loginDTO,
        @Res() res: Response,
        @Session() session: Record<string, any>,
    ): Promise<void> {
        const { accessToken, refreshToken, nickname, image } =
            await this.userService.login(loginDTO);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        session.refreshToken = refreshToken;

        res.status(HttpStatus.OK).json({ accessToken, nickname, image });
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(
        @Res() res: Response,
        @Session() session: Record<string, any>,
    ): void {
        res.clearCookie('connect.sid');

        session.destroy((err: any) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                });
            } else {
                res.status(HttpStatus.OK).json({ success: true });
            }
        });
    }

    @Post('/validate')
    @HttpCode(HttpStatus.OK)
    validateNickname(@Body() nickname: string) {
        return this.userService.findNickname(nickname);
    }
}
