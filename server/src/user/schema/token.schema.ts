import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginSchema {
    @Field()
    accessToken: string;

    @Field()
    nickname: string;

    @Field()
    image: string;
}
