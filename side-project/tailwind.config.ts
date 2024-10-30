import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: {
        small_font: {
          css: {
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(55, 56, 60, 0.61)',
          },
        },
        large_font: {
          css: {
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '28px',
            color: 'rgb(23, 23, 25)',
            textAlign: 'center',
          },
        },
        error_font: {
          css: {
            color: 'rgb(255, 66, 66)',
            textAlign: 'left',
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '18px',
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
