import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SharedProp } from 'src/common/sharedProp.helper';
import { UserEntity } from './user.entity';

@Entity('UserAddress')
export class UserAddressEntity extends SharedProp {
    @PrimaryGeneratedColumn({ name: 'address_id' })
    addressId: number;

    @Column('int', { name: 'zone_code' })
    zoneCode: number;

    @Column()
    address: string;

    @Column({ name: 'detail_address' })
    detailAddress: string;

    @OneToOne(() => UserEntity, (user) => user.address)
    user: UserEntity;
}
