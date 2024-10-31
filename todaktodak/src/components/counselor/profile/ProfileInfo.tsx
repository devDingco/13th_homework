export default function ProfileInfo() {
  return (
    <div className="space-y-6">
      {/* Specializations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">전문 분야</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600">🧠</span>
            </div>
            <div>
              <div className="font-medium">우울증</div>
              <div className="text-sm text-gray-500">Depression</div>
            </div>
          </div>
          {/* More specializations... */}
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">학력 및 자격</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium">학력</div>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>서울대학교 심리학과 박사</li>
              <li>연세대학교 심리학과 석사</li>
              <li>고려대학교 심리학과 학사</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">자격증</div>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>전문상담사 1급</li>
              <li>임상심리사 2급</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">경력</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></div>
            <div className="ml-4">
              <div className="font-medium">서울대학교 학생상담센터</div>
              <div className="text-sm text-gray-500">
                전문상담사 (2018 - 현재)
              </div>
            </div>
          </div>
          {/* More experience items... */}
        </div>
      </div>
    </div>
  );
}
