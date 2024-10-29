import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            // key - jwt VERIFY SIGNATURE를 처리하기 위한 key
            secretOrKey: process.env.JWT_SECRET_KEY,
            // jwt token이 어디에 저장되어있는지
            // access token 같은 경우 headers -> Authorization -> bearer
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
        });
    }

    async validate(payload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findUser(email);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
