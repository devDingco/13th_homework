import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User], 'PostgreSQL'), BcryptModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
