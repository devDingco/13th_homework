'use client';

import { withLoginCheck } from '@/commons/hocs/with-login-check';
import BoardWrite from '@/components/boards-write';

function BoardsNewPage() {
	return <BoardWrite isEdit={false} />;
}

export default withLoginCheck(BoardsNewPage);
