/** @format */

// /** @format */

// import getAllBoards from '@/app/apis/boards/getAllBoards';
// import checkPromiseStatus from '@/utils/checkPromiseStatus';
// import { useEffect, useState } from 'react';

// /** @format */

// export default function useGetData() {
// 	const [data, setData] = useState(null);

// 	useEffect(() => {
// 		const getData = async () => {
// 			getAllBoards().then((promise) => setData(checkPromiseStatus(promise)));
// 		};

// 		getData();
// 	}, []);

// 	return data;
// }
