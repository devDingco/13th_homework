"use client";

import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { I_schema, schema } from "./schema";
import InputField from "./field";
import { Input_Radii_Full } from "./input";
import { Button_Radii_Primary } from "./button";

const CREATE_USER = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            email
            name
            createdAt
        }
    }
`;

export default function TEST_InputForm() {
    /**
     * @params { register, handleSubmit, formState }
     */
    const methods = useForm<I_schema>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const [createUser] = useMutation(CREATE_USER);

    async function onClickSignup(data: I_schema) {
        if (data.password !== data.pwConfirm) return;

        const user = await createUser({
            variables: {
                createUserInput: {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                },
            },
        });
        console.log(user);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onClickSignup)}>
                <InputField<I_schema> keyname="email" formState={methods.formState} required />
                <InputField<I_schema> keyname="name" formState={methods.formState} required />
                <InputField<I_schema> keyname="password" formState={methods.formState} required />
                <InputField<I_schema> keyname="pwConfirm" formState={methods.formState} required />

                {/* <InputField<I_schema> keyname="contents" formState={methods.formState} textarea /> */}

                <Button_Radii_Primary<I_schema> label="회원가입" />
            </form>
        </FormProvider>
    );
}
