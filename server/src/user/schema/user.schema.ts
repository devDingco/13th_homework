import { Field, Int, ObjectType } from '@nestjs/graphql';

import { SharedProp } from 'src/common/sharedProp.helper';

@ObjectType()
export class UserSchema extends SharedProp {
    @Field(() => Int)
    userId: number;

    @Field()
    name: string;

    @Field()
    email: string;
}
