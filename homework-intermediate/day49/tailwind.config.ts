import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/commons/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				pretendard: ['Pretendard-Regular', 'sans-serif'],
				hakgyo: ['HakgyoansimDunggeunmisoTTF-B'],
			},
		},
	},
	plugins: [tailwindScrollbar],
};

export default config;
