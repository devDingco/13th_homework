interface BtnProps {
    className?: string;
    value?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler;
}
// 버튼 컴포넌트 - 당장에는 딱히 큰 도움 안되지만 아무튼 컴포넌트
export default function Btn({ className, value, disabled, onClick }: BtnProps) {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
}
