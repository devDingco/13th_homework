import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Column } from 'typeorm';

@InputType()
export class BoardPasswordBodyDTO {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    password: string;
}
