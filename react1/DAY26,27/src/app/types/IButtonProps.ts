export interface IButtonProps {
    onSubmit: () => Promise<void>;
    onReset?: () => void;
    style?: React.CSSProperties;
    isDisabled: boolean;
    isEdit: boolean;
    showResetButton?: boolean;
}
