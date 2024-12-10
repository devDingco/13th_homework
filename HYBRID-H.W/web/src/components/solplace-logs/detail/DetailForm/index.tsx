'use client';
import KaKaoMap from '@/components/kakaoMap/kakaoMap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DetailFormComponent() {
  const router = useRouter();
  const [handleMap, setHandleMap] = useState(false);
  const onClickMap = () => {
    setHandleMap(!handleMap);
  };

  const onClickEditPage = () => {
    // router.push('/solplace-logs/edit') // id로 넘겨줘야함
  };
  return (
    <main className="p-4">
      <article className="flex flex-col gap-2">
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h3>Bramble & Brioche 한남점</h3>
            <button>
              <Image src="/icons/edit.png" alt="edit" width={24} height={24} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <Image
              src="/icons/location.png"
              alt="locationIcon"
              width={16}
              height={16}
              className="flex-shrink-0"
              objectFit="cover"
            />
            <span className="text-gray-600 text-sm">
              서울특별시 용산구 이태원로49길 24-14
            </span>
            <button onClick={onClickMap} className="flex items-center text-sm">
              {handleMap === true ? '지도 접기' : '지도 보기'}
              {handleMap === true ? (
                <Image
                  src="/icons/up-arrow.svg"
                  alt="up"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/icons/down-arrow.svg"
                  alt="up"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
        </section>
        {handleMap && (
          <section>
            <KaKaoMap lat={37.5664056} lng={126.9778222} />
          </section>
        )}
        <hr />
        <section className="w-full">
          <p className="text-sm font-normal text-gray-800 text-wrap">
            Bramble & Brioche는 하루를 천천히 시작하고 싶은 사람들을 위한 아늑한
            브런치 카페예요. 바쁜 일상에서 잠깐 벗어나, 따뜻한 공간에서 여유를
            느끼고 싶다면 이곳이 제격이에요.
            <br />
            <br />
            이곳에서는 누구든 부담 없이 와서 편하게 시간을 보낼 수 있어요. 혼자
            책을 읽거나 친구와 담소를 나누기에도 딱 좋죠. 브리오쉬는 매일
            신선하게 구워지고, 상큼한 브램블 베리 잼과 함께라면 기분까지
            상쾌해질 거예요.
            <br />
            <br />
            특별할 것 없는 평범한 하루를 조금 더 특별하게 만들고 싶을 때,
            Bramble & Brioche가 그 순간을 채워줄 거예요. 인테리어도 감성적이고
            따뜻해서, 그냥 앉아 있기만 해도 힐링되는 공간이에요.
            <br />
            <br />
            언제든지 오세요. 이곳에서 당신만의 시간을 편안하게 즐길 수 있어요.
            따뜻한 브런치 한 접시가 기다리고 있어요.
          </p>
        </section>
      </article>
    </main>
  );
}
