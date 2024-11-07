import { UserService } from './user.service';
import { userDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(userDTO: userDTO): Promise<User>;
}
