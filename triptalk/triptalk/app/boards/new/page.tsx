'use client';
import NavBar from "../../(component)/Navbar";
import TextInput from "../../(component)/TextInput";
import TextAreaInput from "../../(component)/TextareaInput";
import { TextAreaInputProps } from "../../(component)/TextareaInput";
import PasswordInput from "../../(component)/PasswordInput";
import { PasswordInputProps } from "../../(component)/PasswordInput";
import { useState } from "react";
import React from "react";

const BoardNewPage = () => {
    const [textInputProps, setTextInputProps] = useState({
        label: '',
        required: false,
        placeholder: '',
    });

    const [stringInput, setStringInput] = useState('');

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) => setStringInput(event.target.value);

    return (
    <>
        <NavBar />
        <div className="font-bold">게시물 등록</div>
        <div className="flex">
            <TextInput 
                label = {textInputProps.label}
                required = {textInputProps.required}
                placeholder = {textInputProps.placeholder}
                value = {stringInput}
                onChange = {onChange}
            />
        </div>
    </>
    );
};

export default BoardNewPage;