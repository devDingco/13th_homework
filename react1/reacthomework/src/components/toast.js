import { useToast } from "../hook/useToast";

const Toast = () => {

    const { toast } = useToast();
    
    const handleSave = () => {
       toast('저장되었습니다')
    }

    const handleConfirm = () => {
        toast('확인되었습니다')
    }

    return (
        <>
            <div>
                <button onClick={handleSave}></button>
                <button onClick={handleConfirm}></button>
            </div>
        </>
    )
};

export default Toast;