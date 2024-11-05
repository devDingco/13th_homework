import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { signUpDTO } from '../dto/signUp.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User, 'PostgreSQL')
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(signUpDTO: signUpDTO): Promise<User> {
        const user = this.userRepository.create(signUpDTO);
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

    async findUserPK(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({
            id,
        });
        if (!user) {
            throw new NotFoundException('is not exist');
        }
        return user;
    }

    async findUserEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email,
        });

        if (!user) {
            throw new NotFoundException('is not exist email');
        }
        return user;
    }
}
