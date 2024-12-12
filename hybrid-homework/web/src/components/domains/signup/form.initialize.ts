"use client";
import { UseFormReturn } from "react-hook-form";
import { ISchema } from "./form.schema";
import { gql, useMutation } from "@apollo/client";
import { webviewlog } from "@/commons/libraries/webview-log";
import { useEffect } from "react";

const SIGNUP = gql`
  mutation signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      id
    }
  }
`;

export const useInitialize = (
  methods: UseFormReturn<ISchema>,
  setModalOpen: (open: boolean) => void
) => {
  const [signup] = useMutation(SIGNUP);

  const onSubmit = async (data: ISchema) => {
    const { email, password, name } = data;

    try {
      const result = await signup({
        variables: {
          signupInput: { email, password, name },
        },
      });
      webviewlog(result);
      setModalOpen(true);
    } catch (error) {
      webviewlog(error);
    }
  };

  useEffect(() => {
    methods.setValue("email", "");
    methods.setValue("name", "");
    methods.setValue("password", "");
  }, []);

  return {
    onSubmit,
  };
};
