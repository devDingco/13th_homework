import Image from "next/image";

export default function Card() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">
        이번 달 주요 감정
      </h3>
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
          <Image src="/images/sad.png" width={35} height={35} alt="" />
        </div>
        <div>
          <div className="font-medium">행복</div>
          <div className="text-sm text-gray-500">45%</div>
        </div>
      </div>
    </div>
  );
}
