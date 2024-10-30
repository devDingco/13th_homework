export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pt-20 pb-16">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              토닥토닥과 함께
              <br />
              당신의 마음을 보듬어보세요
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              일상의 감정을 기록하고, 전문 상담사와 함께 이야기를 나눠보세요
            </p>
            <div className="mt-8">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                시작하기
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                📝
              </div>
              <h3 className="mt-4 text-lg font-semibold">감정 일기</h3>
              <p className="mt-2 text-gray-600">하루의 감정을 기록하세요</p>
            </div>
            {/* Add more features */}
          </div>
        </div>
      </div>
    </div>
  );
}
