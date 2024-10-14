import { useState } from "react";

export default function useSubmit() {
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const valid = author && password && title && content;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;
        console.log(event.target);

        switch (id) {
            case "author": {
                setAuthor(value);
                break;
            }
            case "password": {
                setPassword(value);
                break;
            }
            case "title": {
                setTitle(value);
                break;
            }
            case "content": {
                setContent(value);
                break;
            }
        }
    };

    return {
        author,
        password,
        title,
        content,
        valid,
        handleChange,
    };
}
