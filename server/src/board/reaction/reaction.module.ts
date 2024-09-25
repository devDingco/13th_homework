import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { BoardReactionRepository } from './repositories/boardReactionRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardReaction } from './entities/reaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BoardReaction])],
    controllers: [ReactionController],
    providers: [ReactionService, BoardReactionRepository],
})
export class ReactionModule {}
