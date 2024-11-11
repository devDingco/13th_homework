import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider } from 'src/common/enums/provider.enum';
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

    async validationSocialToken(provider: Provider, token: string) {
        if (provider === Provider.GOOGLE) {
            return await this.validationGoogleToken(token);
        } else if (provider === Provider.KAKAO) {
            return await this.validationKakaoToken(token);
        } else if (provider === Provider.NAVER) {
            return await this.validationNaverToken(token);
        }
    }

    async validationGoogleToken(token: string) {
        try {
            const response = await fetch(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
            );
            if (response) return true;
        } catch (error) {
            throw new Error('구글 id_token 이상함');
        }
    }
    async validationKakaoToken(token: string) {
        try {
            const response = await fetch(
                'https://kapi.kakao.com/v1/user/access_token_info',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response) return true;
        } catch (error) {
            throw new Error('kakao access token 이상함');
        }
    }
    async validationNaverToken(token: string) {
        try {
            const response = await fetch(
                `https://openapi.naver.com/v1/nid/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response) return true;
        } catch (error) {
            throw new Error('naver token 이상함');
        }
    }
}
