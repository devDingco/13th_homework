import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { userDTO } from './dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly bcryptService;
    constructor(userRepository: UserRepository, bcryptService: BcryptService);
    createUser(userDTO: userDTO): Promise<User>;
}
