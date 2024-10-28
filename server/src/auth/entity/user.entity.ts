import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}
