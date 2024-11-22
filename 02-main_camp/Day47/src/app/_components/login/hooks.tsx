import { useForm } from "react-hook-form";

export default function useLogin() {
  const { register, handleSubmit } = useForm();

  return {
    register,
    handleSubmit,
  };
}
