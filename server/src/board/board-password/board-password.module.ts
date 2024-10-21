import { BoardEntity } from '../entity/board.entity';
import { BoardPasswordController } from './board-password.controller';
import { BoardPasswordResolver } from './board-password.resolver';
import { BoardPasswordService } from './board-password.service';
import { BoardRepository } from '../repository/board.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity], 'mongodb')],
    controllers: [BoardPasswordController],
    providers: [BoardPasswordService, BoardRepository, BoardPasswordResolver],
})
export class BoardPasswordModule {}
