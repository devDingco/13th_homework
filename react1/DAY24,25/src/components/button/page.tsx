'use client';

import { MouseEvent, FC } from 'react';
import { IButtonProps } from '@/app/types/IButtonProps';
import styles from '@/app/pages/boards/new/BoardsNew.module.css';

const Button: FC<IButtonProps> = ({
    onSubmit,
    onReset,
    style,
    isDisabled,
    isEdit,
}): JSX.Element => {
    console.log('버튼props', { isEdit, isDisabled, style });

    const submitBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onSubmit();
    };

    const resetBtn = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onReset();
    };

    return (
        <>
            <div className={styles.formButton}>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    onClick={submitBtn}
                    style={style}
                    disabled={isDisabled}
                >
                    {isEdit ? '수정하기' : '등록하기'}
                </button>
                <button
                    type="reset"
                    className={styles.resetBtn}
                    onClick={resetBtn}
                >
                    취소
                </button>
            </div>
            <div></div>
        </>
    );
};

export default Button;
