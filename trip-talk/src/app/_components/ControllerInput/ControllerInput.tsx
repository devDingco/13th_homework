import { Controller } from "react-hook-form";
import Input from "../Input/Input";

export default function ControllerInput(props) {
  const {control, id, formState} = props;
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div className="w-full gap-2 flex flex-col">
          <Input id={id} {...field} isLabel={true} required={true} />
          <div className="text-lightCoral pl-2">
            {formState.errors[id]?.message}
          </div>
        </div>
      )}
    />
  );
}
