import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/board/decorators/response-message.decorator';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ResponseMessage('user가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() authcredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.authService.signUp(authcredentialsDTO);
    }

    @Post('/login')
    @ResponseMessage('login이 성공적으로 되었습니다.')
    @HttpCode(HttpStatus.OK)
    login(@Body() authcredentialsDTO: AuthCredentialsDTO) {
        return this.authService.signIn(authcredentialsDTO);
    }
}
