import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity, 'PostgreSQL')
        private readonly userRepository: Repository<UserEntity>,
    ) {}
}
