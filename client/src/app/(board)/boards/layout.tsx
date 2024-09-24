/** @format */
import { IProps } from '@/models/children';

export default function Layout({ children }: IProps) {
    return (
        <div className="py-10 gap-10 flex flex-col w-[75dvw]">{children}</div>
    );
}
