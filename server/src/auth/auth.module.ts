import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { jwtConfig } from 'configs/jwt.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User], 'PostgreSQL'),
        BcryptModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: jwtConfig,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
