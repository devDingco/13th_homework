import Image from 'next/image';
import styles from './styles.module.css';
import Button from '@/components/button/page';
import useCommentWrite from './hook';

export default function CommentWriteUI({ boardId }: { boardId: string }) {
    const {
        handleName,
        handlePassword,
        handleContent,
        handleSubmit,
        writer,
        password,
        content,
        errorAlert,
        isActive,
    } = useCommentWrite(boardId);

    const onreset = () => {
        handleName({
            target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
        handlePassword({
            target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
        handleContent({
            target: { value: '' },
        } as React.ChangeEvent<HTMLTextAreaElement>);
    };
    return (
        <>
            <div className={styles.boxWrapper}>
                <div className={styles.commentHeader}>
                    <Image
                        src="/images/chat.png"
                        alt="댓글창"
                        width={24}
                        height={24}
                    />
                    <span>댓글</span>
                </div>
                <Image
                    src="/images/star.png"
                    alt="star"
                    className={styles.starIcon}
                    width={24}
                    height={24}
                />

                <div className={styles.inputWrapper}>
                    <div className={styles.inputArea}>
                        <input
                            placeholder="작성자"
                            onChange={handleName}
                            value={writer}
                        />
                    </div>
                    <div className={styles.inputArea}>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            onChange={handlePassword}
                            value={password}
                        />
                    </div>
                </div>
                <div className={styles.contentsWrapper}>
                    <textarea
                        className={styles.contents}
                        maxLength={100}
                        onChange={handleContent}
                        value={content}
                        placeholder="댓글을 입력해주세요"
                    />
                    {errorAlert && (
                        <p className={styles.errorAlert}>{errorAlert}</p>
                    )}
                    <Button
                        onSubmit={handleSubmit}
                        isDisabled={!isActive}
                        isEdit={false}
                        showResetButton={false}
                        onReset={onreset}
                        style={{
                            backgroundColor: isActive ? '#2974E5' : '#CCCCCC',
                        }}
                    />
                </div>
            </div>
        </>
    );
}
