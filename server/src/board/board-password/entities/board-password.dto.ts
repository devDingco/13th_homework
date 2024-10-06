import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Column } from 'typeorm';

@InputType()
export class BoardPasswordDTO {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    password: string;
}
