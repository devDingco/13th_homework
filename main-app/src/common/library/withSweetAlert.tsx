import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function withSweetAlert() {
    /**
     * @param title "string" 표시될 메세지를 적어주세요.
     * @param icon "string" warning, error, info, question, success중 선택하여 적어주세요.
     */
    const plainAlert = (title: string, icon: string) => {
        withReactContent(Swal).fire({
            title: title,
            icon: icon,
            showConfirmButton: false,
            timer: 1100,
        });
    };

    /**
     * @param title "string" 표시될 메세지를 적어주세요.
     */
    const errorAlert = (title: string) => {
        withReactContent(Swal).fire({
            title: title,
            icon: "error",
            showConfirmButton: true,
        });
    };

    return {
        plainAlert,
        errorAlert,
    };
}
