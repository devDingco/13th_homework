'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from './carouselBtn';
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './carouselDisplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from './styles.module.css';

const Carousel: React.FC<{ options?: EmblaOptionsType }> = ({
    options,
}): JSX.Element => {
    const slides = [
        '/images/tripWithCat.png',
        '/images/tripCarrier.png',
        '/images/tripAirport.png',
        '/images/tripWhereGoing.png',
        '/images/tripIndonesia.png',
        '/images/tripWithTurtle.png',
    ];
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {slides.map((slide, index) => (
                        <div className={styles.embla__slide} key={index}>
                            <Image
                                src={slide}
                                alt={`Slide ${index}`}
                                layout="fill"
                                objectFit="cover"
                                className={styles.bannerImage}
                            />
                            {/* <div className={styles.embla__slide__number}>
                                {index + 1}
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.embla__controls}>
                <div className={styles.embla__buttons}>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <SelectedSnapDisplay
                    selectedSnap={selectedSnap}
                    snapCount={snapCount}
                />
            </div>
        </div>
    );
};

export default Carousel;
