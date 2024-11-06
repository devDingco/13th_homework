import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from 'configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfigService,
        }),
        TypeOrmModule.forFeature([User], 'PostgreSQL'),
    ],

    providers: [AuthService, JwtStrategy, UserRepository],
    exports: [PassportModule, AuthService, JwtStrategy],
})
export class AuthModule {}
