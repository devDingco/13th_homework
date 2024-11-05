import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            signOptions: { expiresIn: '1h' },
        };
    }
}
