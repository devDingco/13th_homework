import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import styles from './styles.module.css';
import classNames from 'classnames';

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props;

    return (
        <>
            <button
                className={classNames(
                    styles.embla__button,
                    styles.embla__button__prev
                )}
                type="button"
                {...restProps}
            >
                <svg
                    className={styles.embla__button__svg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="navy"
                        d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    />
                </svg>
                {children}
            </button>
        </>
    );
};

export const NextButton: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props;

    return (
        <button
            className={classNames(
                styles.embla__button,
                styles.embla__button__next
            )}
            type="button"
            {...restProps}
        >
            <svg
                className={styles.embla__button__svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fill="navy"
                    d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                />
            </svg>
            {children}
        </button>
    );
};
