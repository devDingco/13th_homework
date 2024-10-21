import { BoardReactionController } from './board-reaction.controller';
import { BoardReactionEntity } from './entity/board-reaction.entity';
import { BoardReactionRepository } from './repository/boardReactionRepository';
import { BoardReactionResolver } from './board-reaction.resolver';
import { BoardReactionService } from './board-reaction.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardReactionEntity], 'mongodb')],
    controllers: [BoardReactionController],
    providers: [
        BoardReactionService,
        BoardReactionRepository,
        BoardReactionResolver,
    ],
})
export class BoardReactionModule {}
