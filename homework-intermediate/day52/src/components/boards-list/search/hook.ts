import { useRef } from 'react';

export default function useDebounce(cb, delay) {
	let timer; // useRef로 timer를 컴포넌트와 독립적으로 유지

	return (...args) => {
		if (timer) clearTimeout(timer); // 이전 타이머를 초기화
		timer = setTimeout(() => {
			cb(...args); // delay 후에 콜백 실행
		}, delay);
	};
}
