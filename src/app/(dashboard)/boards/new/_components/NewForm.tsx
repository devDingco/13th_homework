/** @format */
'use client';

import NewAddressInputContainer from './NewAddressInputContainer';
import NewInputContainer from './NewInputContainer';
import NewImageContainer from './NewImageContainer';
import NewTextarea from './NewTextarea';
import NewFormButton from './NewFormButton';
import { ETitle } from '@/models/newTitle';
import { createBoardAction } from '@/app/actions/createBoardAction';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { IInputValueParameter } from '@/models/inputValueParameter';

export default function NewForm() {
    const [state, formAction] = useFormState(createBoardAction, {
        errors: {
            author: undefined,
            password: undefined,
            title: undefined,
            content: undefined,
        },
    });

    const [formValues, setFormValues] = useState({
        Author: '',
        Password: '',
        Title: '',
        Content: '',
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const allFieldsFilled = Object.values(formValues).every(
            (value) => value.trim() !== ''
        );
        setIsButtonDisabled(!allFieldsFilled);
    }, [formValues]);

    const onChangeValue = ({ name, value }: IInputValueParameter) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className="flex flex-col gap-10" action={formAction}>
            <div className="flex gap-10 border-b-[1px] border-gray-200 pb-10">
                <NewInputContainer
                    title={ETitle.Author}
                    error={state.errors?.author}
                    onChangeValue={onChangeValue}
                />
                <NewInputContainer
                    title={ETitle.Password}
                    error={state.errors?.password}
                    onChangeValue={onChangeValue}
                />
            </div>
            <NewInputContainer
                title={ETitle.Title}
                error={state.errors?.title}
                onChangeValue={onChangeValue}
            />
            <NewTextarea
                title={ETitle.Content}
                error={state.errors?.content}
                onChangeValue={onChangeValue}
            />
            <NewAddressInputContainer title={ETitle.Address} />
            <NewInputContainer title={ETitle.YoutubeLink} />
            <NewImageContainer />
            <NewFormButton isButtonDisabled={isButtonDisabled} />
        </form>
    );
}
