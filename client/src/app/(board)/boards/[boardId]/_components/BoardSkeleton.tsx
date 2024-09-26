/** @format */

export default function BoardSkeleton() {
	return (
		<div role="status" className="animate-pulse flex flex-col gap-4">
			<div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 max-w-full"></div>
			<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-16"></div>
			<div className="h-80 bg-gray-200 rounded-2xl dark:bg-gray-700 max-w-full flex flex-col gap-4">
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
				<div className="bg-white w-full h-3 "></div>
			</div>
			<div className="h-80 bg-gray-200 rounded-2xl dark:bg-gray-700 max-w-full"></div>

			<span className="sr-only">Loading...</span>
		</div>
	);
}
