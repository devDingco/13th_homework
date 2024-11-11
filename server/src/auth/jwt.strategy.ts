import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            // key - jwt VERIFY SIGNATURE를 처리하기 위한 key
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            // jwt token이 어디에 저장되어있는지
            // access token 같은 경우 headers -> Authorization -> bearer
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }
    async validate(payload: any): Promise<any> {
        const { userId } = payload;
        const user: UserEntity = await this.userRepository.findUserPK(userId);

        if (!user) {
            return new UnauthorizedException('유효하지 않은 사용자입니다.');
        }
        return user;
    }
}
