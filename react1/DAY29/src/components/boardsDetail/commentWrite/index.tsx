import Image from 'next/image';
import styles from './styles.module.css';
import Button from '@/components/button/page';
import useCommentWrite from './hook';
import BoardRatingUI from '@/components/rating';

export default function CommentWriteUI() {
    const {
        writer,
        password,
        contents,
        handleSubmit,
        handleInputChange,
        errorAlert,
        isActive,
        setWriter,
        setPassword,
        setContents,
        setIsActive,
    } = useCommentWrite();

    constresetForm = (): void => {
        setWriter(''); // Directly reset the writer state
        setPassword(''); // Directly reset the password state
        setContents(''); // Directly reset the contents state
        setIsActive(false); // Reset the active state
    };
    return (
        <>
            <div className={styles.layoutBox}>
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
                    <BoardRatingUI />

                    <div className={styles.inputWrapper}>
                        <div>
                            <input
                                className={styles.inputArea}
                                placeholder="작성자"
                                onChange={handleInputChange('writer')}
                                value={writer}
                            />
                        </div>
                        <div>
                            <input
                                className={styles.inputArea}
                                type="password"
                                placeholder="비밀번호"
                                onChange={handleInputChange('password')}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className={styles.contentsWrapper}>
                        <textarea
                            className={styles.contents}
                            maxLength={100}
                            onChange={handleInputChange('contents')}
                            value={contents}
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
                            onReset={handleReset}
                            style={{
                                backgroundColor: isActive
                                    ? '#2974E5'
                                    : '#CCCCCC',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
