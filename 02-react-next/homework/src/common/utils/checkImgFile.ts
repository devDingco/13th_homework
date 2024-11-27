export const checkImgFile = (file?: File) => {
    if (!file) {
        alert("파일이 없는데요..? 어떻게 들어오셨나요...?");
        return false;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert(
            "아이고 나으리 이런거 쓰시면 저희 써버비로 다 말라죽어요 (5MB로 맞춰주셍~)"
        );
        return false;
    }

    if (!file.type.includes("jpeg") && !file.type.includes("png")) {
        alert("사진만 넣어주십쇼 jpeg png");
        return false;
    }

    return true;
};
