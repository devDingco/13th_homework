import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class typeORMMongoDBConfig implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mongodb',
            host: this.configService.get<string>('MONGO_DB_HOST'),
            port: this.configService.get<number>('MONGO_DB_PORT'),
            database: this.configService.get<string>('MONGO_DB_DATABASE'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],

            synchronize: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            useUnifiedTopology: true,
            logging: true,
        };
    }
}
