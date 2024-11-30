"use client";
import { css } from "@/styled-system/css";
import ImageBox from "@/components/ui/image-box";
import AddressBox from "@/components/ui/address-box";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeNewSchema, type_schema } from "./schema";

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

                <label className={css_label}>
                    플레이스 이름 <b>*</b>
                    <input
                        className={css(css_input)}
                        placeholder="플레이스 이름을 입력해 주세요. (1글자 이상)"
                        {...methods.register("name")}
                    />
                </label>

                <AddressBox />

                <label className={css_label}>
                    플레이스 내용 <b>*</b>
                    <textarea
                        className={css(css_input, css_text)}
                        placeholder="플레이스 내용을 입력해 주세요. (1글자 이상)"
                        {...methods.register("contents")}
                    />
                </label>

                <button className={css_button}>로그 등록</button>
            </form>
        </FormProvider>
    );
}

const css_form = css({
    display: "flex",
    flexDir: "column",
    gap: "2rem",
});

const css_label = css({
    display: "flex",
    flexDir: "column",
    gap: "0.8rem",
});

const css_input = css.raw({
    w: "100%",
    h: "4.8rem",
    rounded: "0.8rem",
    border: "1px solid #d4d4d4",
    p: "0.8rem 1.6rem",
    fontSize: "1.2rem",
});

const css_text = css.raw({
    pt: "1.6rem",
    minH: "16rem",
    resize: "none",
});

const css_button = css({
    w: "100%",
    h: "4.8rem",
    bg: "#c7c7c7",
    rounded: "0.8rem",
    fontSize: "2rem",
    color: "#f5f5f5",
    mt: "2rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
