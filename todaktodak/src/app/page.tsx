import Link from "next/link";

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
              <Link
                href={`/login`}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                시작하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
