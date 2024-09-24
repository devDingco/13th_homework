/** @format */

import Image from 'next/image';

export default function BoardIcon() {
    return (
        <div className="w-full flex items-center justify-end gap-2">
            <Image src="/Images/link.svg" alt="link" width={24} height={24} />
            <Image
                src="/Images/location.svg"
                alt="link"
                width={24}
                height={24}
            />
        </div>
    );
}
