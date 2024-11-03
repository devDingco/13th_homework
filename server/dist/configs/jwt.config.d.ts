import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare const jwtConfig: (configService: ConfigService) => Promise<JwtModuleOptions>;
