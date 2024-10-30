import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreateUserDocument } from "../graphql/graphql";

export default function useSignUp() {
  const { register, handleSubmit, control } = useForm();
  const [createUser] = useMutation(CreateUserDocument);

  const onClickSubmit = async (data) => {
    console.log(data);

    const result = await createUser({
      variables: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
    console.log(result);
  };
  return {
    onClickSubmit,
    register,
    handleSubmit,
    control,
  };
}
