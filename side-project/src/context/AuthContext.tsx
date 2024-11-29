'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  getAccessToken,
  logoutUser,
} from '../commons/libraries/accessTokenRefresh';

interface AuthContextProps {
  accessToken: string | null;
  // isAuthenticated: boolean;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const newToken = await getAccessToken();
      if (newToken) setAccessToken(newToken);
    };
    fetchAccessToken();
  }, []);

  const refreshAccessToken = async (): Promise<string | null> => {
    const newToken = await getAccessToken();
    // if (newToken) setAccessToken(newToken);
    if (newToken) {
      setAccessToken(newToken);
    } else {
      setAccessToken(null); // 토큰 갱신 실패 시 인증되지 않은 상태로 설정
    }

    return newToken;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result) {
      setAccessToken(null);
      router.push('/login');
    } else {
      console.error('로그아웃에 실패했습니다.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        // isAuthenticated: !!accessToken,
        refreshAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth은 AuthProvider내에서만 있어야 합니다~~');
  return context;
};
