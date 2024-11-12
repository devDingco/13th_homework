import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Provider } from 'src/common/enums/provider.enum';
import { Role } from 'src/common/enums/role.enum';
import { SharedProp } from 'src/common/sharedProp.helper';
import { UserAddressEntity } from './user-address.entity';

@Entity('User')
export class UserEntity extends SharedProp {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    nickname?: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    @Exclude()
    password?: string;

    @Column({ nullable: true })
    image?: string;

    // 나중에 에러 잡아야함
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role?: Role;

    @Column({ nullable: true })
    provider?: string;

    @OneToOne(() => UserAddressEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'address_id' })
    address?: UserAddressEntity;
}
