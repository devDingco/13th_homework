'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Main() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const func = () => {
    if (isAuthenticated) {
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
      {isAuthenticated && <button onClick={func}>등록하기</button>}
      {isAuthenticated && <button onClick={logout2}>로그아웃</button>}
    </div>
  );
}
