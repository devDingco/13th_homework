import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from './dto/user.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from './entity/user.entity';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @ResponseMessage('user가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() userDTO: userDTO): Promise<User> {
        return this.userService.createUser(userDTO);
    }
}
