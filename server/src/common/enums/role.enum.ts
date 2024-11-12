import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    USER = 'USER',
    MANAGER = 'MANAGER',
}
registerEnumType(Role, {
    name: 'Role',
    description: '사용자 역할 (USER 또는 MANAGER)',
});
