import { registerEnumType } from '@nestjs/graphql';

export enum Provider {
    kakao = 'kakao',
    google = 'google',
    naver = 'naver',
}
registerEnumType(Provider, {
    name: 'Provider',
    description: 'kakao, google, naver',
});
