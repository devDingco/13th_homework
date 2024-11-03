import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDTO } from './dto/signUp.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from './entity/user.entity';
import { loginDTO } from './dto/login.dto';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @ResponseMessage('회원가입이 성공했습니다.')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDTO: signUpDTO): Promise<User> {
        return this.userService.createUser(signUpDTO);
    }

    @Post('/login')
    @ResponseMessage('로그인 성공했습니다.')
    @HttpCode(HttpStatus.CREATED)
    login(@Body() loginDTO: loginDTO) {
        return this.userService.login(loginDTO);
    }
}
