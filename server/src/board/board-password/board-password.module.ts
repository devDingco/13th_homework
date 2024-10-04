import { Board } from '../entities/board.entity';
import { BoardPasswordController } from './board-password.controller';
import { BoardPasswordService } from './board-password.service';
import { BoardRepository } from '../repositories/board.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [BoardPasswordController],
    providers: [BoardPasswordService, BoardRepository],
})
export class BoardPasswordModule {}
