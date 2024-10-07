import { useState } from "react";

export default function useSubmitInput() {
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const valid = author && password && title && content;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        switch (id) {
            case "author__ID": {
                setAuthor(value);
                break;
            }
            case "password__ID": {
                setPassword(value);
                break;
            }
            case "title__ID": {
                setTitle(value);
                break;
            }
            case "content__ID": {
                setContent(value);
                break;
            }
        }
    };

    return {
        handleChange,
        author,
        password,
        title,
        content,
        valid,
    };
}
