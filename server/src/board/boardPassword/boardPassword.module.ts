import { Board } from '../entities/board.entity';
import { BoardPasswordController } from './boardPassword.controller';
import { BoardPasswordService } from './boardPassword.service';
import { BoardRepository } from '../repositories/boardRepository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [BoardPasswordController],
    providers: [BoardPasswordService, BoardRepository],
})
export class BoardPasswordModule {}
