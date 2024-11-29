'use client';
import { useAccessTokenStore } from '@/commons/stores/accessToken';
import MainListComponent from '@/components/main/ListComponent';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Main() {
  const { logout } = useAuth();
  const { accessToken } = useAccessTokenStore();
  const router = useRouter();

  const func = () => {
    if (accessToken) {
      router.push('/boards/new');
    } else {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  };
  const logout2 = async () => {
    await logout();
    router.push('/login');
  };
  return (
    <div>
      <p>메인</p>
      {accessToken && <button onClick={func}>등록하기</button>} <br />
      {accessToken && <button onClick={logout2}>로그아웃</button>}
      <br />
      <MainListComponent />
    </div>
  );
}
