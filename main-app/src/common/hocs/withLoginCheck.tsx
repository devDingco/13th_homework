"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withSweetAlert from "../library/withSweetAlert";

export const withLoginCheck =
    (Comps: () => JSX.Element) =>
    <P extends object>(props: P) => {
        const router = useRouter();

        const { plainAlert } = withSweetAlert();

        useEffect(() => {
            if (sessionStorage.getItem("@_¡¡") === null) {
                plainAlert("로그인 후 이용 가능합니다", "info");
                router.push(`/login`);
            }
        }, []);

        return <Comps {...props} />;
    };
