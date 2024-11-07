import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenSchema {
    @Field()
    accessToken: string;
}
