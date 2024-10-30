export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">토닥토닥</h1>
          <p className="mt-2 text-gray-600">로그인하여 시작하세요</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* 일반 로그인 */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              로그인
            </button>
          </form>

          {/* 간편로그인 라인 표시 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-sm text-gray-500">간편 로그인</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* 소셜로그인 (구글, 카카오, 네이버) */}
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <img src="/google-icon.png" alt="Google" className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center hover:bg-[#FDD800] transition-colors">
              <img src="/kakao-icon.png" alt="Kakao" className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center hover:bg-[#02B351] transition-colors">
              <img src="/naver-icon.png" alt="Naver" className="w-6 h-6" />
            </button>
          </div>

          {/* 회원가입 */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">계정이 없으신가요?</span>
            <a
              href="/signup"
              className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
