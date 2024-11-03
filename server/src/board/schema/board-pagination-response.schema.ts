import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BoardSchema } from './board.schema';

@ObjectType()
export class BoardPaginationResponse {
    @Field(() => [BoardSchema])
    result: BoardSchema[];

    @Field(() => Int)
    totalCount: number;
}
