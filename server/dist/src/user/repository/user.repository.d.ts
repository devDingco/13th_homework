import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { userDTO } from '../dto/user.dto';
export declare class UserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDTO: userDTO): Promise<User>;
    findUser(id: number): Promise<User>;
}
