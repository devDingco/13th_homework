import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async issueLoginToken(email: string) {
        // 여기에 role 넣기
        // user 또는 counselor
        const accessToken = await this.jwtService.signAsync(
            {
                email,
                sub: 'accessToken',
            },
            {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: `${this.configService.get<string>('JWT_ACCESS_EXPIRE')}s`,
            },
        );

        // jti(jwt ID) -> redis
        const refreshToken = await this.jwtService.signAsync(
            {
                email,
                sub: 'refreshToken',
            },
            {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: `${this.configService.get<string>('JWT_REFRESH_EXPIRE')}s`,
            },
        );

        return { accessToken, refreshToken };
    }
}
