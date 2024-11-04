import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSchema {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;
}
