/** @format */

import './globals.css';
import { IProps } from '@/models/children';

export default function RootLayout({ children }: IProps) {
    return (
        <html lang="ko">
            <body className="m-0 p-0 box-border flex justify-center items-center">
                {children}
            </body>
        </html>
    );
}
