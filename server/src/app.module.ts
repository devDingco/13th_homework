import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardCommentModule } from './board/board-comment/board-comment.module';
import { BoardModule } from './board/board.module';
import { BoardPasswordModule } from './board/board-password/board-password.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoDBConfig } from 'configs/mongoDB.config';
import { postgreSQLConfig } from 'configs/postgreSQL.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),

        TypeOrmModule.forRootAsync({
            name: 'MongoDB',
            useClass: mongoDBConfig,
        }),
        TypeOrmModule.forRootAsync({
            name: 'PostgreSQL',
            useClass: postgreSQLConfig,
        }),

        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/graphql/schema.gql',
        }),

        BoardModule,
        BoardPasswordModule,
        BoardCommentModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
