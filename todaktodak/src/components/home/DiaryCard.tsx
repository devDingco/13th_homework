interface DiaryCardProps {
  title: string;
  content: string;
  date: string;
  emotion: string;
}

export default function DiaryCard({
  title,
  content,
  date,
  emotion,
}: DiaryCardProps) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 rounded-full">{emotion}</div>
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-gray-600 text-sm line-clamp-3">{content}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{date}</span>
        <button className="text-sm text-indigo-600">자세히</button>
      </div>
    </div>
  );
}
