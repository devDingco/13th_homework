'use client';

import ComponetCard from '@/components/boards-detail/card';
import BoardsComponentList from '@/components/boards-list/list';
import TripTalk from './triptalk/page';
import { useState } from 'react';

export default function Home() {
    return (
        <>
            <TripTalk />
        </>
    );
}
