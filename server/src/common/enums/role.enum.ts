import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    USER = 'USER',
    MANAGER = 'MANAGER',
}
registerEnumType(Role, {
    name: 'Role', // GraphQL 스키마에서 사용될 이름
    description: '사용자 역할 (USER 또는 MANAGER)',
});
