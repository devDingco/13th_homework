export interface IButtonProps {
   
    onSubmit: () => void;
    onReset: () => void;
    style: React.CSSProperties;
    isDisabled: boolean;
  
}