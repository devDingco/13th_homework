import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity], 'PostgreSQL')],
    controllers: [AuthController],
    providers: [AuthService, UserRepository],
})
export class AuthModule {}
