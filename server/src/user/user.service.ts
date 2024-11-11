import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { loginDTO } from './dto/login.dto';
import { signUpImageDTO } from './dto/signUp-image.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly authService: AuthService,
    ) {}

    async createUser(signUpDTO: signUpImageDTO): Promise<UserEntity> {
        const password: string = await this.bcryptService.transformPassword(
            signUpDTO.password,
        );
        return await this.userRepository.createUser({
            ...signUpDTO,
            password,
        });
    }

    async login(loginDTO: loginDTO) {
        const user: UserEntity = await this.userRepository.findUserEmail(
            loginDTO.email,
        );
        await this.bcryptService.validatePassword(
            loginDTO.password,
            user.password,
        );

        const token = await this.authService.issueLoginToken(
            user.userId,
            user.role,
            loginDTO.dev,
        );

        return { ...token };
    }

    async findNickname(nickname: string) {
        return await this.userRepository.findUserNickname(nickname);
    }
}
