import { CreateBoardImageDto } from './create-board-image.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBoardImageDto extends PartialType(CreateBoardImageDto) {}
