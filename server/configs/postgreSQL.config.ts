import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserAddressEntity } from 'src/user/entity/user-address.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class postgreSQLConfig implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRE_DB_HOST'),
            port: this.configService.get<number>('POSTGRE_DB_PORT'),
            username: this.configService.get<string>('POSTGRE_DB_USERNAME'),
            password: this.configService.get<string>('POSTGRE_DB_PASSWORD'),
            database: this.configService.get<string>('POSTGRE_DB_DATABASE'),
            entities: [UserEntity, UserAddressEntity],
            synchronize: true,
            autoLoadEntities: true,
            logging: false,
        };
    }
}
