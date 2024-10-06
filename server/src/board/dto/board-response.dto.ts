import { ObjectType, OmitType } from '@nestjs/graphql';

import { Board } from '../entities/board.entity';

@ObjectType()
export class BoardResponseDto extends OmitType(Board, ['password'] as const) {}
