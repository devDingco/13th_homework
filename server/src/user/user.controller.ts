import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Req,
    Res,
    Session,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDTO } from './dto/signUp.dto';
import { loginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'configs/multer.config';
import { uploadFile } from 'src/common/types/upload-file.interface';
import { SocialLoginDTO } from './dto/social-login.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('/api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async signUp(
        @Body() signUpDTO: signUpDTO,
        @Body('address') address,
        @UploadedFile() image: uploadFile,
    ): Promise<boolean> {
        if (address) {
            signUpDTO.address = JSON.parse(address);
        }

        const user = await this.userService.createUser({
            ...signUpDTO,
            image: image?.location,
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
        const { accessToken, refreshToken, name, image } =
            await this.userService.login(loginDTO);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        session.refreshToken = refreshToken;

        res.status(HttpStatus.OK).json({ accessToken, name, image });
    }

    @Post('/social/login')
    @HttpCode(HttpStatus.OK)
    async socialLogin(
        @Body() socialLoginDto: SocialLoginDTO,
        @Req() req: Request,
        @Res() res: Response,
        @Session() session: Record<string, any>,
    ) {
        const result = await this.authService.validationSocialToken(
            socialLoginDto.provider,
            req.headers.authorization.split(' ')[1],
        );

        if (result) {
            const { accessToken, refreshToken } =
                await this.userService.socialLogin(socialLoginDto);

            res.setHeader('Authorization', `Bearer ${accessToken}`);

            session.refreshToken = refreshToken;

            res.status(HttpStatus.OK).json({ accessToken });
        }
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

    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Req() req: Request, @Res() res: Response): Promise<void> {
        const userId = req.user.userId;
        await this.userService.deleteUser(Number(userId));

        res.clearCookie('connect.sid');

        req.session.destroy((err) => {
            if (err) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: '세션 삭제 실패',
                });
            }
            return res
                .status(HttpStatus.OK)
                .json({ success: true, message: '계정 삭제' });
        });
    }
}
