// 함수의 매개변수는 타입추론이 안된다. 언제어디서 실행될 지 모르기 때문에
export const checkValidtionFile = (file?: File) => {
    // 파일 타입 더블체크
    if (typeof file === 'undefined') {
        alert('파일이 없습니다');
        return false;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('파일 용량이 큽니다.(제한: 5MB)');
        return false; // 종료
    }

    if (!file.type.includes('jpeg') && !file.type.includes('png')) {
        alert('jpeg또는 png 파일만 업로드 가능합니다!!!');
        return false; // 종료
    }

    return true; // 실제 종료는 onChangeFile이 되야 하니까~
};
