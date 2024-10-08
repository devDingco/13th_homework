import Image from 'next/image';
import styles from './styles.module.css';
import { getDate } from '@/commons/units/date';
import useCommentList from './hook';

export default function CommentListUI({ boardId }: { boardId: string }) {
    const { data, handleOnclickDelete } = useCommentList(boardId);

    return (
        <div>
            {data?.fetchBoardComments?.map((el) => (
                <div className={styles.itemWrapper} key={el._id}>
                    <div className={styles.imagesWrapper}>
                        <span className={styles.leftIcon}>
                            <Image
                                src="/images/userIcon.png"
                                alt="userIcon"
                                width={24}
                                height={24}
                            />
                            <Image
                                src="/images/star.png"
                                alt="star"
                                width={24}
                                height={24}
                            />
                        </span>
                        <span className={styles.leftIcon}>
                            <Image
                                src="/images/edit.png"
                                alt="수정하기"
                                width={20}
                                height={20}
                            />
                            <button
                                id={el._id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOnclickDelete(el._id, 'password');
                                }}
                            >
                                <Image
                                    src="/images/close.png"
                                    alt="삭제하기"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </span>
                    </div>
                    <textarea className="commentContents">
                        {el.contents}
                    </textarea>
                    <div className={styles.date}>
                        {' '}
                        {getDate(el?.createdAt)}{' '}
                    </div>
                </div>
            ))}
        </div>
    );
}
