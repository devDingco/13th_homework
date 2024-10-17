import { BoardReaction } from './entities/board-reaction.entity';
import { BoardReactionController } from './board-reaction.controller';
import { BoardReactionRepository } from './repositories/boardReactionRepository';
import { BoardReactionResolver } from './board-reaction.resolver';
import { BoardReactionService } from './board-reaction.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardReaction], 'mongodb')],
    controllers: [BoardReactionController],
    providers: [
        BoardReactionService,
        BoardReactionRepository,
        BoardReactionResolver,
    ],
})
export class BoardReactionModule {}
