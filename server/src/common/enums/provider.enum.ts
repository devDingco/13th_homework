import { registerEnumType } from '@nestjs/graphql';

export enum Provider {
    KAKAO = 'kakao',
    GOOGLE = 'google',
    NAVER = 'naver',
}
registerEnumType(Provider, {
    name: 'Provider',
    description: 'kakao, google, naver',
});
