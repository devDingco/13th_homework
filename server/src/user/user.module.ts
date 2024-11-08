import { AuthModule } from 'src/auth/auth.module';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressEntity } from './entity/user-address.entity';
import { UserAddressRepository } from './repository/user-address.repository';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserAddressEntity], 'PostgreSQL'),
        BcryptModule,
        AuthModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        UserAddressRepository,
        UserResolver,
    ],
})
export class UserModule {}
