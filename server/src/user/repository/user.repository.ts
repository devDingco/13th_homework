import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { userDTO } from '../dto/user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User, 'PostgreSQL')
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(userDTO: userDTO): Promise<User> {
        const user = this.userRepository.create(userDTO);
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

    async findUser(id: number): Promise<User> {
        return await this.userRepository.findOneBy({
            id,
        });
    }
}
