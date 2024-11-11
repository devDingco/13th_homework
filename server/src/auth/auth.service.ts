import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async issueLoginToken(userId: number, role: Role, dev: boolean) {
        // 여기에 role 넣기
        // user 또는 counselor
        const accessToken = await this.jwtService.signAsync(
            {
                userId,
                role,
                sub: 'accessToken',
            },
            {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: dev
                    ? `${this.configService.get<string>('JWT_REFRESH_EXPIRE')}s`
                    : `${this.configService.get<string>('JWT_ACCESS_EXPIRE')}s`,
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            {
                userId,
                role,
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
