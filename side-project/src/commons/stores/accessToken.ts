import { Token } from '@/graphql/types';
import { create } from 'zustand';

export interface IAccessToken extends Required<Token> {}
// token 타입 정리해야함

export const useAccessTokenStore = create<
  IAccessToken & { setAccessToken: (newAccessToken: string) => void }
>((set) => {
  return {
    __typename: 'Token',
    accessToken: '',
    setAccessToken: (newAccessToken) =>
      set(() => ({ accessToken: newAccessToken })),
  };
});
