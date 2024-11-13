"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withSweetAlert from "../library/withSweetAlert";

import { useLoadStore } from "../stores/useLoadStore";
import { useTokenStore } from "../stores/useTokenStore";

export const withLoginCheck =
    (Comps: () => JSX.Element) =>
    <P extends object>(props: P) => {
        const router = useRouter();

        const { isLoaded } = useLoadStore();
        const { token } = useTokenStore();

        const { plainAlert } = withSweetAlert();

        useEffect(() => {
            if (!isLoaded) return;
            if (token) return;

            plainAlert(`로그인 후 이용 가능합니다`, "info");
            router.push(`/auth`, { scroll: false });
        }, [isLoaded]);

        return <Comps {...props} />;
    };
