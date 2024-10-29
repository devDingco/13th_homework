import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { userDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
    ) {}

    async createUser(userDTO: userDTO): Promise<User> {
        const password: string = await this.bcryptService.transformPassword(
            userDTO.password,
        );
        return await this.userRepository.createUser({
            ...userDTO,
            password,
        });
    }
}
