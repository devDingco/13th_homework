import { Field, ObjectType } from '@nestjs/graphql';

import { TokenSchema } from './token.schema';

@ObjectType()
export class LoginSchema extends TokenSchema {
    @Field()
    name: string;

    @Field()
    image: string;
}
