import { paintPost } from "./paintPost.js";

export function calculationPagination(array, focus) {
    const length = Math.ceil(array.length / 12);
    const paginationElement = document.getElementById("pagination-list");

    paginationElement.innerHTML = "";
    // const arrowLeft = `
    //     <svg
    //         width="7"
    //         height="12"
    //         viewBox="0 0 7 12"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         style="cursor: pointer"
    //         onclick="onClickPrevPagination()"
    //     >
    //         <path
    //             d="M2.8001 5.99688L6.7001 2.09688C6.88343 1.91354 6.9751 1.68021 6.9751 1.39688C6.9751 1.11354 6.88343 0.880208 6.7001 0.696875C6.51676 0.513542 6.28343 0.421875 6.0001 0.421875C5.71676 0.421875 5.48343 0.513542 5.3001 0.696875L0.700098 5.29688C0.600098 5.39687 0.529264 5.50521 0.487597 5.62188C0.445931 5.73854 0.425097 5.86354 0.425097 5.99688C0.425097 6.13021 0.445931 6.25521 0.487597 6.37188C0.529264 6.48854 0.600098 6.59688 0.700098 6.69688L5.3001 11.2969C5.48343 11.4802 5.71676 11.5719 6.0001 11.5719C6.28343 11.5719 6.51676 11.4802 6.7001 11.2969C6.88343 11.1135 6.9751 10.8802 6.9751 10.5969C6.9751 10.3135 6.88343 10.0802 6.7001 9.89688L2.8001 5.99688Z"
    //             fill="#333333"
    //         />
    //     </svg>
    // `;

    // const arrowRight = `
    //     <svg
    //         width="7"
    //         height="12"
    //         viewBox="0 0 7 12"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         style="cursor: pointer"
    //         onclick="onClickNextPagination()"
    //     >
    //         <path
    //             d="M4.5998 5.99688L0.699805 2.09688C0.516471 1.91354 0.424805 1.68021 0.424805 1.39688C0.424805 1.11354 0.516471 0.880208 0.699805 0.696875C0.883138 0.513542 1.11647 0.421875 1.3998 0.421875C1.68314 0.421875 1.91647 0.513542 2.0998 0.696875L6.6998 5.29688C6.7998 5.39687 6.87064 5.50521 6.9123 5.62188C6.95397 5.73854 6.9748 5.86354 6.9748 5.99688C6.9748 6.13021 6.95397 6.25521 6.9123 6.37188C6.87064 6.48854 6.7998 6.59688 6.6998 6.69688L2.0998 11.2969C1.91647 11.4802 1.68314 11.5719 1.3998 11.5719C1.11647 11.5719 0.883138 11.4802 0.699805 11.2969C0.516471 11.1135 0.424805 10.8802 0.424805 10.5969C0.424805 10.3135 0.516471 10.0802 0.699805 9.89688L4.5998 5.99688Z"
    //             fill="#333333"
    //         />
    //     </svg>
    // `;

    for (let i = 1; i <= length; i++) {
        const buttonElement = document.createElement("div");
        // 여기서 ===가 아닌 ==을 사용한 이유
        // focus는 현재 localstorage에 저장되어 있기 떄문에
        // 형변환을 하지 않고 그대로 사용하게 되면 String 타입이다
        // 하지만 i는 number 타입이므로 ===를 사용하면 문제가 발생한다.
        buttonElement.className = focus == i ? "page_button_bg" : "page_button";
        buttonElement.innerText = i;
        buttonElement.onclick = () => {
            focus = i;
            localStorage.setItem("focus", focus);
            paintPost(array);
        };

        paginationElement.appendChild(buttonElement);
    }

    localStorage.setItem("focus", focus);
}
