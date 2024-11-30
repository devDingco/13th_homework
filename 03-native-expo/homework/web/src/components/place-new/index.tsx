"use client";
import { css } from "@/styled-system/css";
import ImageBox from "@/components/ui/image-box";
import AddressBox from "@/components/ui/address-box";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeNewSchema, type_schema } from "./schema";
import InputBox from "../ui/input-box";
import Button from "../ui/_button";

export default function PlaceNewUI() {
    const methods = useForm<type_schema>({
        resolver: zodResolver(placeNewSchema),
        mode: "onChange",
    });

    function onClickNew(form: type_schema) {
        console.log("test", form);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onClickNew)} className={css_form}>
                <ImageBox />

                <InputBox keyname="name" required />

                <AddressBox />

                <InputBox keyname="contents" required textarea />

                <Button label="로그 등록" />
            </form>
        </FormProvider>
    );
}

const css_form = css({
    display: "flex",
    flexDir: "column",
    gap: "2rem",
});
