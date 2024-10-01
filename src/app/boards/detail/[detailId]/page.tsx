'use client';
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';

const IMAGE_SRC = {
  profileImage: {
    src: require('@assets/profile_image.png'),
    alt: '프로필이미지',
  },
  linkImage: {
    src: require('@assets/link.png'),
    alt: '링크아이콘',
  },
  locationImage: {
    src: require('@assets/location.png'),
    alt: '위치아이콘',
  },
  cheongsanImage: {
    src: require('@assets/cheongsan.png'),
    alt: '청산사진',
  },
  neotubeImage: {
    src: require('@assets/neotube.png'),
    alt: '너튜브사진',
  },
  badImage: {
    src: require('@assets/bad.png'),
    alt: '싫어요',
  },
  goodImage: {
    src: require('@assets/good.png'),
    alt: '좋아요',
  },
  hamberger: {
    src: require('@assets/hamberger.png'),
    alt: '목록아이콘',
  },
  pencil: {
    src: require('@assets/pencil.png'),
    alt: '수정아이콘',
  },
} as const;

export default function BoardsDetailPage() {
  const { detailId } = useParams();
  const 나의그래프큐엘셋팅 = gql`
    query fetchBoard($detailId: ID!) {
      fetchBoard(boardId: $detailId) {
        _id
        writer
        title
        contents
        youtubeUrl
        likeCount
        images
        boardAddress {
          zipcode
          address
          addressDetail
        }
        createdAt
        updatedAt
        deletedAt
      }
    }
  `;

  const { loading, error, data } = useQuery(나의그래프큐엘셋팅);
  console.dir(data);

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div>홍길동</div>
            </div>
            <div className={styles.detailMetadataDate}>2024.11.11</div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Image
              src={IMAGE_SRC.locationImage.src}
              alt={IMAGE_SRC.locationImage.alt}
            />
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              <div>살겠노라 살겠노라. 청산에 살겠노라.</div>
              <div>머루랑 다래를 먹고 청산에 살겠노라.</div>
              <div>얄리얄리 얄랑셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>우는구나 우는구나 새야. 자고 일어나 우는구나 새야.</div>
              <div>너보다 시름 많은 나도 자고 일어나 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>
                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
              </div>
              <div>이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>이럭저럭 하여 낮일랑 지내 왔건만</div>
              <div>올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>어디다 던지는 돌인가 누구를 맞히려던 돌인가.</div>
              <div>미워할 이도 사랑할 이도 없이 맞아서 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>살겠노라 살겠노라. 바다에 살겠노라.</div>
              <div>나문재, 굴, 조개를 먹고 바다에 살겠노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.</div>
              <div>
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className={styles.textGap}></div>
              <div>가다 보니 배불룩한 술독에 독한 술을 빚는구나.</div>
              <div>
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
            </div>
            <Image
              src={IMAGE_SRC.neotubeImage.src}
              alt={IMAGE_SRC.neotubeImage.alt}
            />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.badImage.src}
                  alt={IMAGE_SRC.badImage.alt}
                />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <Image
                  src={IMAGE_SRC.goodImage.src}
                  alt={IMAGE_SRC.goodImage.alt}
                />
                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />
                <div>목록으로</div>
              </button>
              <button className={styles.detailButton}>
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
