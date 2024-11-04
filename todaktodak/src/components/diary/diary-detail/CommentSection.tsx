import { CommentItem } from "./comment/CommentItem";

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="divide-y">
      {/* 댓글 작성 폼 */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="flex-1">
            <textarea
              placeholder="따뜻한 댓글을 남겨주세요"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
