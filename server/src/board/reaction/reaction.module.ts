import { BoardReaction } from './entities/reaction.entity';
import { BoardReactionRepository } from './repositories/boardReactionRepository';
import { BoardReactionResolver } from './reaction.resolver';
import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardReaction])],
    controllers: [ReactionController],
    providers: [
        ReactionService,
        BoardReactionRepository,
        BoardReactionResolver,
    ],
})
export class ReactionModule {}
