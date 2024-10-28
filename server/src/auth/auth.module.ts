import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BoardModule } from 'src/board/board.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User], 'PostgreSQL'), BoardModule],
    controllers: [AuthController],
    providers: [AuthService, UserRepository],
})
export class AuthModule {}
