import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository], 'PostgreSQL')],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
