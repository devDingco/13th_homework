/** @format */

export interface IFormStateError {
    errors: {
        author?: string;
        password?: string;
        title?: string;
        content?: string;
    };
}

export interface IFormState {
    Author: string;
    Password: string;
    Title: string;
    Content: string;
}
