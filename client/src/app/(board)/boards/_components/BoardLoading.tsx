/** @format */

export default function BoardLoading() {
	return (
		<div role="status" className="max-w-sm animate-pulse flex flex-col gap-3">
			<div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[400px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[200px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px]"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px]"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
