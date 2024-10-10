import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import useBoardRating from './hook';
import { IBoardsRatingProps } from '@/app/types/IBoardsRatingProps';
import styles from './styles.module.css';

export default function BoardRatingUI({ boardId, userId }: IBoardsRatingProps) {
    const {
        rating,
        showTooltip,
        isRated,
        hover,
        getLabelText,
        handleRatingChange,
        handleHoverChange,
    } = useBoardRating({ boardId, userId });

    console.log('User ID:', userId);

    return (
        <>
            <div className={styles.ratingContainer}>
                <Stack spacing={1}>
                    <Tooltip
                        title={showTooltip ? '평가를 완료했습니다' : ''}
                        open={showTooltip}
                    >
                        <Rating
                            name={`rating-${boardId}`}
                            value={rating}
                            precision={0.5}
                            onChange={handleRatingChange}
                            onChangeActive={handleHoverChange}
                            getLabelText={getLabelText}
                            readOnly={isRated}
                        />
                    </Tooltip>
                    {rating !== null && (
                        <span className={styles.ratingText}>
                            {getLabelText(hover !== -1 ? hover : rating)}
                        </span>
                    )}
                </Stack>
            </div>
        </>
    );
}
