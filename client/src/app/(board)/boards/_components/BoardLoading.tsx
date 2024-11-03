/** @format */

export default function BoardLoading() {
	return (
		<div role="status" className="flex max-w-sm animate-pulse flex-col gap-3">
			<div className="mb-2 h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[400px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[500px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[260px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<div className="h-6 max-w-[160px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
