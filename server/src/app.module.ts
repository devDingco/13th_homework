import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { BoardPasswordModule } from './board/board-password/board-password.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'configs/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: typeORMConfig,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),

        BoardModule,
        BoardPasswordModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
