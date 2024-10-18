import { FetchBoardCommentsDocument } from '@/commons/graphql/graphql';
import { DELETE_BOARD_COMMENT } from '@/commons/queries/deleteBoardComment';
import { IBoardComment } from '@/app/types/IBoardComment';
import { useAppContext } from '@/contexts/AppContext';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DeleteIcon({ el }: { el: IBoardComment }) {
    const router = useRouter();
    const { boardId, password } = useAppContext();
    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

    const handleOnclickDelete = async () => {
        try {
            await deleteBoardComment({
                variables: {
                    password,
                    boardCommentId: el._id,
                },
                refetchQueries: [
                    {
                        query: FetchBoardCommentsDocument,
                        variables: { boardId },
                    },
                ],
            });
            console.log(boardId);
            router.push(`/commentWrite/${boardId}`);
        } catch (error) {
            console.log('에러가 났어요', error);
        }
    };

    return (
        <>
            <button
                id={el._id}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOnclickDelete();
                }}
            >
                <Image
                    src="/images/close.png"
                    alt="삭제하기"
                    width={20}
                    height={20}
                />
            </button>
        </>
    );
}
