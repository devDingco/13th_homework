"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withLoginCheck = (Comps: any) => (props: any) => {
    const router = useRouter();

    useEffect(() => {
        if (sessionStorage.getItem("@_¡¡") === null) {
            alert("로그인 후 이용 가능합니다");
            router.push(`/login`);
        }
    }, []);

    return <Comps {...props} />;
};
