import { Field, ObjectType } from '@nestjs/graphql';

import { TokenSchema } from './token.schema';

@ObjectType()
export class LoginSchema extends TokenSchema {
    @Field()
    nickname: string;

    @Field()
    image: string;
}
