import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SweetAlert() {
    /**
     * @param title alert modal의 설명을 적어주세요.
     */
    const successAlert = (title: string) => {
        withReactContent(Swal).fire({
            title: title,
            icon: "success",
            showConfirmButton: false,
            timer: 1100,
        });
    };

    /**
     * @param title alert modal의 설명을 적어주세요.
     */
    const errorAlert = (title: string) => {
        withReactContent(Swal).fire({
            title: title,
            icon: "error",
            showConfirmButton: false,
            timer: 1100,
        });
    };

    return {
        successAlert,
        errorAlert,
    };
}
