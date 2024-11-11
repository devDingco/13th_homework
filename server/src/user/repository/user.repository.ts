import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { signUpDTO } from '../dto/signUp.dto';
import { SocialLoginDTO } from '../dto/social-login.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity, 'PostgreSQL')
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(signUpDTO: signUpDTO): Promise<UserEntity> {
        const user = this.userRepository.create(signUpDTO);

        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('이메일이 존재합니다.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async createSocialUser(socialLoginDto: SocialLoginDTO) {
        const user = this.userRepository.create(socialLoginDto);

        return await this.userRepository.save(user);
    }

    async findUserPK(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({
            userId,
        });
        if (!user) {
            throw new NotFoundException(
                `해당 유저 ${userId}를 찾지 못했습니다.`,
            );
        }
        return user;
    }

    async findUserEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({
            email,
        });
    }

    async findUserNickname(nickname: string): Promise<Boolean> {
        const user = await this.userRepository.findOneBy({
            nickname,
        });

        if (user) {
            throw new ConflictException(`${nickname}이 중복되어 있습니다.`);
        }

        return true;
    }
}
