import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async issueLoginToken(email: string) {
        const payload = { email };

        // 여기에 role 넣기
        // user 또는 counselor
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });

        // jti(jwt ID) -> redis
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }
}
