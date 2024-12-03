import Button from '@mui/material/Button';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

export function CustomButton({
  text,
  onClick,
  variant = 'contained',
}: CustomButtonProps) {
  return (
    <Button variant={variant} color="primary" onClick={onClick}>
      {text}
    </Button>
  );
}
