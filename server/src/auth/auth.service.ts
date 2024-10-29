import { Injectable, NotFoundException } from '@nestjs/common';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { userDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
    ) {}

    async signUp(userDTO: userDTO): Promise<User> {
        const password: string = await this.bcryptService.transformPassword(
            userDTO.password,
        );
        return await this.userRepository.createUser({
            ...userDTO,
            password,
        });
    }

    async signIn(userDTO: userDTO): Promise<{ accessToken: string }> {
        const { email, password } = userDTO;
        const user: User = await this.userRepository.findUser(email);

        if (!user) {
            throw new NotFoundException('is not exist email in database');
        }

        await this.bcryptService.validatePassword(password, user.password);
        // create access token
        const payload = { id: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
