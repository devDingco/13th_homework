import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'configs/typeorm.config';
import { ReactionModule } from './board/reaction/reaction.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: typeORMConfig,
        }),

        BoardModule,
        ReactionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
