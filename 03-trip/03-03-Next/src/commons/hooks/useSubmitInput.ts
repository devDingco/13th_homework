import { useState } from "react";

export default function useSubmitInput() {
    const [submitInput, setSubmitInput] = useState({
        author_ID: "",
        password_ID: "",
        title_ID: "",
        content_ID: "",
    });

    const author = submitInput.author_ID;
    const password = submitInput.password_ID;
    const title = submitInput.title_ID;
    const content = submitInput.content_ID;
    const valid = author && password && title && content;

    const handleChange = (e) => {
        const submitInputFields = { ...submitInput };

        submitInputFields[e.target.id] = e.target.value;
        setSubmitInput(submitInputFields);
    };

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

    return {
        handleChange,
        author,
        password,
        title,
        content,
        valid,
    };
}
