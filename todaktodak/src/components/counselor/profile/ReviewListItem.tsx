import { Receipt, Star } from "lucide-react";

interface ReviewListItemProps {
  review: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    content: string;
    receiptImage?: string;
  };
}

export default function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="ml-3">
            <div className="font-medium">{review.userName}</div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
        </div>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < review.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-600 mb-4">{review.content}</p>

      {review.receiptImage && (
        <div className="mt-4">
          <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-700">
            <Receipt className="w-4 h-4 mr-1" />
            영수증 보기
          </button>
        </div>
      )}
    </div>
  );
}
