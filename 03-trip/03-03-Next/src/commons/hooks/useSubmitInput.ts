import { useState } from "react";
import { ISubmitInput } from "../types/types";

export default function useSubmitInput() {
    const [submitInput, setSubmitInput] = useState<ISubmitInput>({
        author_ID: "",
        password_ID: "",
        title_ID: "",
        content_ID: "",
    });

    const author = submitInput.author_ID;
    const password = submitInput.password_ID;
    const title = submitInput.title_ID;
    const content = submitInput.content_ID;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const submitInputFields = { ...submitInput };
        console.log(e.target.id);

        submitInputFields[e.target.id] = e.target.value;
        setSubmitInput(submitInputFields);
        console.log(submitInput);
    };

    return {
        handleChange,
        author,
        password,
        title,
        content,
    };
}

// const [author, setAuthor] = useState("");
// const [password, setPassword] = useState("");
// const [title, setTitle] = useState("");
// const [content, setContent] = useState("");
// const valid = author && password && title && content;

// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const id = event.target.id;
//     const value = event.target.value;
//     console.log(event.target);

//     switch (id) {
//         case "author": {
//             setAuthor(value);
//             break;
//         }
//         case "password": {
//             setPassword(value);
//             break;
//         }
//         case "title": {
//             setTitle(value);
//             break;
//         }
//         case "content": {
//             setContent(value);
//             break;
//         }
//     }
// };
