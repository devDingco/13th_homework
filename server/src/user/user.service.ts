import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SocialLoginDTO } from './dto/social-login.dto';
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
        const user: UserEntity | undefined =
            await this.userRepository.findUserEmail(loginDTO.email);

        if (!user) {
            throw new NotFoundException(
                `${loginDTO.email}이 존재하지 않습니다.`,
            );
        }

        await this.bcryptService.validatePassword(
            loginDTO.password,
            user.password,
        );

        const token = await this.authService.issueLoginToken(
            user.userId,
            user.role,
            loginDTO.dev,
        );

        return { ...token, image: user.image, name: user.name };
    }

    async socialLogin(socialLoginDto: SocialLoginDTO) {
        let user: UserEntity | undefined =
            await this.userRepository.findUserEmail(socialLoginDto.email);

        if (!user) {
            user = await this.userRepository.createSocialUser(socialLoginDto);
        }

        const token = await this.authService.issueLoginToken(
            user.userId,
            user.role,
            true,
        );

        return { ...token };
    }

    async findNickname(nickname: string) {
        return await this.userRepository.findUserNickname(nickname);
    }
}
