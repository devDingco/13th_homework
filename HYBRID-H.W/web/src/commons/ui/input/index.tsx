import TextField from '@mui/material/TextField';

interface CustomInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: CustomInputProps) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
    />
  );
}
