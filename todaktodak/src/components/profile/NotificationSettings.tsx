import { Bell } from "lucide-react";

export default function NotificationSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Bell className="w-5 h-5 mr-2 text-indigo-600" />
        알림 설정
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <span className="font-medium">상담 예약 알림</span>
            <span className="text-sm text-gray-500">상담 24시간 전에 알림</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <span className="font-medium">일기 작성 리마인더</span>
            <span className="text-sm text-gray-500">매일 저녁 8시 알림</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
