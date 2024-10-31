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

    // const deleteDialog = () => {
    //     withReactContent(Swal)
    //         .fire({
    //             title: "정말 삭제하시겠습니까?",
    //             text: "되돌릴 수 없어요!",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "삭제합니다!",
    //             cancelButtonText: "취소",
    //         })
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 Swal.fire({
    //                     title: "삭제",
    //                     text: "삭제되었습니다!",
    //                     icon: "success",
    //                 });
    //             }
    //         });
    // };

    return {
        plainAlert,
        errorAlert,
    };
}
