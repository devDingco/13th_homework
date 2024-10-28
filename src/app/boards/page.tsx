'use client';

import BoardsComponentListBanner from '@/components/boards-list/banner';
import BoardsComponentList from '../../components/boards-list/list';

export default function BoardList(props: any) {
    return (
        <>
            <BoardsComponentListBanner />
            <BoardsComponentList />
        </>
    );
}
