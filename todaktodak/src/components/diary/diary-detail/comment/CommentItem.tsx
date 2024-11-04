import { Heart } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="p-4">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
          <img
            src={comment.author.image}
            alt={comment.author.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-gray-900">
                {comment.author.name}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {comment.createdAt}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <Heart className="w-4 h-4 mr-1" />
                <span className="text-sm">{comment.likes}</span>
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                답글
              </button>
            </div>
          </div>
          <p className="mt-1 text-gray-700">{comment.content}</p>

          {/* 답글이 있는 경우 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
