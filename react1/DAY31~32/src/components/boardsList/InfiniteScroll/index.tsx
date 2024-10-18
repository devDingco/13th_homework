import React, { useEffect, useRef } from 'react';

interface IInfiniteScrollProps {
    onLoadMore: () => Promise<void>;
    hasMore: boolean;
    loading: boolean;
    children?: React.ReactNode;
}

const InfiniteScroll: React.FC<IInfiniteScrollProps> = ({
    onLoadMore,
    hasMore,
    loading,
    children,
}) => {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && hasMore) {
                onLoadMore();
            }
        };

        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: '20px',
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            observer?.disconnect();
        };
    }, [onLoadMore, hasMore, loading]);

    return (
        <div>
            {children}

            <div ref={loadMoreRef}>{loading && <p>Loading...</p>}</div>
        </div>
    );
};

export default InfiniteScroll;
