import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@InjectRepository()
export class UserRepository extends Repository<User> {}
