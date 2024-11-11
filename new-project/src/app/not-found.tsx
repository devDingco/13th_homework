import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid w-full h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          페이지를 찾을 수 없습니다.
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={"/"}
            className="rounded-md bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            메인으로
          </Link>
        </div>
      </div>
    </div>
  );
}
