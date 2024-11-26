'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import { headerMap } from '@/types/header.type';

export default function Header() {
    const path = usePathname();
    const router = useRouter();
    const headerName = headerMap[path]

    return (
        <div className="flex py-5 gap-2 items-center">
            <Image
                src={'/Images/left_arrow.png'}
                alt="BackButton"
                width={24}
                height={24}
                className="cursor-pointer size-6"
                onClick={() => router.back()}
            />
            <div className="prose-sb_18_24">{headerName}</div>
        </div>
    );
}
