import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressEntity } from '../entity/user-address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAddressRepository {
    constructor(
        @InjectRepository(UserAddressEntity, 'PostgreSQL')
        private readonly userAddressRepository: Repository<UserAddressEntity>,
    ) {}
}
