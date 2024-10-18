import { CreateBoardDTO } from './create-board.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBoardDTO extends PartialType(CreateBoardDTO) {}
