'use client';

import Image from 'next/image';
import detail from '/public/images/detail.png';
import edit from '/public/images/edit.png';
import toggle from '/public/images/Toggle-Map-Icon.png';
import toggleDown from '/public/images/Down-Arrow.png';

import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// kakao-sdk
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function SolplaceLogIdPage() {
    const router = useRouter();
    const [isUp, setIsUp] = useState(true);

    const onClickNewPage = () => {
        router.push('/soloplace-logs/new');
    };

    const onClicktoggleArrow = () => {
        setIsUp(!isUp);
    };

    return (
        <>
            <script
                type="text/javascript"
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=03d4190545aa1d235bf2053fe6a3b853"
            ></script>

            <div className={styles.container}>
                <div className={styles.layout}>
                    <Image
                        src={detail}
                        alt="detail_img"
                        style={{ width: '100%' }}
                    />

                    <div className={styles.detailBox}>
                        <div className={styles.titleBox}>
                            <p>Bramble & Brioche 한남점2</p>

                            <Image
                                onClick={onClickNewPage}
                                src={edit}
                                alt="edit"
                            />
                        </div>
                        <div className={styles.addressBox}>
                            <div className={styles.addressBoxName}>
                                <Image
                                    src={'/images/location.png'}
                                    alt="location"
                                    width={16}
                                    height={16}
                                    style={{
                                        width: '1rem',
                                        height: '1rem',
                                    }}
                                />
                                서울특별시 동작구 양녕로22바길 63
                                <div className={styles.addressBoxMap}>
                                    지도보기
                                    <div
                                        onClick={onClicktoggleArrow}
                                        style={{ transition: '1s' }}
                                    >
                                        {isUp ? (
                                            <div>
                                                <Image
                                                    src={toggle}
                                                    alt="down-arrow"
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{}}>
                                                <Image
                                                    src={toggleDown}
                                                    alt="down-arrow"
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {!isUp ? (
                                <Map
                                    center={{ lat: 37.566614, lng: 126.978199 }}
                                    style={{ width: '100%', height: '200px' }}
                                >
                                    <MapMarker
                                        position={{
                                            lat: 37.566694,
                                            lng: 126.978199,
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: '#000',
                                                textAlign: 'center',
                                            }}
                                        >
                                            서울시청
                                        </div>
                                    </MapMarker>
                                </Map>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className={styles.ContentsBox}>
                            Bramble & Brioche는 하루를 천천히 시작하고 싶은
                            사람들을 위한 아늑한 브런치 카페예요. 바쁜 일상에서
                            잠깐 벗어나, 따뜻한 공간에서 여유를 느끼고 싶다면
                            이곳이 제격이에요. 이곳에서는 누구든 부담 없이 와서
                            편하게 시간을 보낼 수 있어요. 혼자 책을 읽거나
                            친구와 담소를 나누기에도 딱 좋죠. 브리오쉬는 매일
                            신선하게 구워지고, 상큼한 브램블 베리 잼과 함께라면
                            기분까지 상쾌해질 거예요. 특별할 것 없는 평범한
                            하루를 조금 더 특별하게 만들고 싶을 때, Bramble &
                            Brioche가 그 순간을 채워줄 거예요. 인테리어도
                            감성적이고 따뜻해서, 그냥 앉아 있기만 해도 힐링되는
                            공간이에요. 언제든지 오세요. 이곳에서 당신만의
                            시간을 편안하게 즐길 수 있어요. 따뜻한 브런치 한
                            접시가
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
