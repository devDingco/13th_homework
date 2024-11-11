import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';
import { SharedProp } from 'src/common/sharedProp.helper';
import { UserAddressEntity } from './user-address.entity';

@Entity('User')
export class UserEntity extends SharedProp {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    nickname: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ nullable: false })
    image: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role?: Role;

    @OneToOne(() => UserAddressEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'address_id' })
    address: UserAddressEntity;
}
