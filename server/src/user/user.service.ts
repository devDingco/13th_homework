import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { loginDTO } from './dto/login.dto';
import { signUpDTO } from './dto/signUp.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly authService: AuthService,
    ) {}

    async createUser(signUpDTO: signUpDTO): Promise<User> {
        const password: string = await this.bcryptService.transformPassword(
            signUpDTO.password,
        );
        return await this.userRepository.createUser({
            ...signUpDTO,
            password,
        });
    }

    async login(loginDTO: loginDTO) {
        const user = await this.userRepository.findUserEmail(loginDTO.email);
        await this.bcryptService.validatePassword(
            loginDTO.password,
            user.password,
        );
        const token = await this.authService.issueLoginToken(user.id);

        return { user, ...token };
    }
}
