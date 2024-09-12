import { paintPost } from "./paintPost.js";

export function calculationPagination(array, focus) {
    const length = Math.ceil(array.length / 12);
    const paginationElement = document.getElementById("pagination-list");

    paginationElement.innerHTML = "";

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
