/** @format */

export default function BoardCommentLoading() {
	return (
		<div role="status" className="flex max-w-sm animate-pulse flex-col gap-3">
			<div className="h-6 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
		</div>
	);
}
