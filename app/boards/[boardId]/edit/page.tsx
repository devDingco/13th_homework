'use client';

import { useParams } from 'next/navigation';
import BoardComponentWrite from '../../../../next-project/src/components/boards-write';
import { gql, useQuery } from '@apollo/client';

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
        }
    }
`;

export default function BoardEditPage() {
    const params = useParams();

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: String(params.boardId),
        },
    });
    console.log(data);

    return <BoardComponentWrite isEdit={true} data={data} />;
}
