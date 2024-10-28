import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { BoardService } from 'src/board/board.service';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly boardService: BoardService,
    ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const password: string = await this.boardService.transformPassword(
            authCredentialsDTO.password,
        );
        return await this.userRepository.createUser({
            ...authCredentialsDTO,
            password,
        });
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<boolean> {
        const { email, password } = authCredentialsDTO;
        const userData = await this.userRepository.findUser(email);
        const passwordValidation = await bcrypt.compare(
            password,
            userData.password,
        );

        if (!passwordValidation)
            throw new UnauthorizedException('password is not correct');
        else return true;
    }
}
