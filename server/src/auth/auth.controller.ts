import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/board/decorators/response-message.decorator';
import { userDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { Response } from 'express';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ResponseMessage('user가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() userDTO: userDTO): Promise<User> {
        return this.authService.signUp(userDTO);
    }

    @Post('/login')
    @ResponseMessage('login이 성공적으로 되었습니다.')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userDTO: userDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.signIn(userDTO);
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
        return res.json(jwt);
    }
}
