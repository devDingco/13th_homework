import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Session,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuhtController {
    constructor(private readonly authService: AuthService) {}

    @Post('/token')
    @HttpCode(HttpStatus.CREATED)
    token(@Session() session) {
        console.log(session);
        return 1;
    }
}
