import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { AuthCredentialsDTO } from '../dto/auth-credential.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User, 'PostgreSQL')
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(authCredentialDTO: AuthCredentialsDTO): Promise<User> {
        const { email, password } = authCredentialDTO;
        const user = this.userRepository.create({ email, password });
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findUser(email: string) {
        const userInfor = await this.userRepository.findOneBy({
            email,
        });

        if (!userInfor) throw new NotFoundException('is not exist login infor');

        return userInfor;
    }
}
