import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = async (
    configService: ConfigService,
): Promise<JwtModuleOptions> => ({
    secret: configService.get<string>('JWT_ACCESS_SECRET'),
    signOptions: { expiresIn: '1h' },
});
