import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from 'configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfigService,
        }),
    ],

    providers: [AuthService],
    exports: [PassportModule, AuthService],
})
export class AuthModule {}
