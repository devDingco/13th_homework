'use client';
import Footer from '@/commons/layout/header/footer';
import styles from './styles.module.css';
import { register } from 'module';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/commons/libraries/map/useKakaoLoader';
import { useState } from 'react';

export default function soloplaceLogsNewMapPage() {
    useKakaoLoader();

    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570662,
    });

    return (
        <div className={styles.container}>
            <div className={styles.Layout}>
                <Map // 지도를 표시할 Container
                    id="map"
                    center={{
                        lat: 33.450701,
                        lng: 126.570662,
                    }}
                    style={{
                        width: '100%',
                        height: '37.75rem',
                    }}
                    level={2} // 지도의 확대 레벨
                    onDragEnd={(map) => {
                        const lat = map.getCenter().getLat();
                        const lng = map.getCenter().getLng();
                        setCenter({ lat, lng }); // 중앙 마커의 위치를 업데이트
                    }}
                >
                    <MapMarker position={center} draggable={false}>
                        <div style={{ color: '#000' }}>수정해야함</div>
                    </MapMarker>
                </Map>

                <div className={styles.footerBox}>
                    <div className={styles.footerBoxAddress}></div>
                    <button className={styles.footerBoxRegisterBtn}>
                        이 위치로 등록
                    </button>
                </div>
            </div>
        </div>
    );
}
