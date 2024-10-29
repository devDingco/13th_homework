import { AuthCredentialsDTO } from './dto/auth-credential.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
    ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const password: string = await this.bcryptService.transformPassword(
            authCredentialsDTO.password,
        );
        return await this.userRepository.createUser({
            ...authCredentialsDTO,
            password,
        });
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO) {
        const { email, password } = authCredentialsDTO;
        const userData = await this.userRepository.findUser(email);

        await this.bcryptService.validatePassword(password, userData.password);
    }
}
