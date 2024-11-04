import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserIdSchema {
    @Field(() => ID)
    id: number;
}
