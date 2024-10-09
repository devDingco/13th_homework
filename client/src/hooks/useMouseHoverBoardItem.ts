/** @format */
'use client';

import { useState } from 'react';

export function useMouseHoverBoardItem(id: number | null) {
	const [hoveredItem, setHoveredItem] = useState<number | null>(id);
}
