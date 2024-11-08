import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { BoardCommentEntity } from 'src/board/board-comment/entity/board-comment.entity';
import { BoardEntity } from 'src/board/entity/board.entity';
import { BoardIdCounterEntity } from 'src/board/entity/board-boardId.entity';
import { BoardReactionEntity } from 'src/board/board-reaction/entity/board-reaction.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mongoDBConfig implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mongodb',
            host: this.configService.get<string>('MONGO_DB_HOST'),
            port: this.configService.get<number>('MONGO_DB_PORT'),
            database: this.configService.get<string>('MONGO_DB_DATABASE'),
            entities: [
                BoardIdCounterEntity,
                BoardEntity,
                BoardReactionEntity,
                BoardCommentEntity,
            ],

            synchronize: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            useUnifiedTopology: true,
            logging: true,
        };
    }
}
