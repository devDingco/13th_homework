import { useState } from "react";
import { ISubmitInput } from "../types/types";
import useDaumPostApi from "./useDaumPostApi";

export default function useSubmitInput() {
    const { zipcode, address } = useDaumPostApi();

    const [submitInput, setSubmitInput] = useState<ISubmitInput>({
        author_ID: "",
        password_ID: "",
        title_ID: "",
        content_ID: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitInput((prev) => ({
            ...prev,
            zipcode_ID: zipcode,
            address01_ID: address,
            [e.target.id]: e.target.value,
        }));
        console.log(submitInput);
    };

    // const submitInputFields = { ...submitInput };
    // submitInputFields[e.target.id] = e.target.value;
    // setSubmitInput(submitInputFields);
    // console.log(submitInput);

    // variable naming compression
    const author = submitInput.author_ID;
    const password = submitInput.password_ID;
    const title = submitInput.title_ID;
    const content = submitInput.content_ID;

    const youtube = submitInput.link_ID;
    const addressDetail = submitInput?.address02_ID;

    return {
        handleChange,
        author,
        password,
        title,
        content,

        youtube,
        zipcode,
        address,
        addressDetail,
    };
}
