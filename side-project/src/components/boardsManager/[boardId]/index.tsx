'use client';

import Image from 'next/image';
import useBoardsManagerDetail from './hooks';

// 여기서 이미지 성능개선
export default function BoardsManagerDetail() {
  const { data } = useBoardsManagerDetail();
  return (
    <div className="flex flex-col gap-4">
      작성자 : {data?.fetchBoard.writer}
      제목 : {data?.fetchBoard.title}
      내용 : {data?.fetchBoard.contents}
      <div className="flex gap-2">
        이미지 :
        {data?.fetchBoard.images?.map((url, index) => (
          <div key={`${index}_${url}`}>
            <Image
              src={`https://storage.googleapis.com/${url}`}
              alt={`${url}`}
              width={200}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      주소 :<div></div>
    </div>
  );
}
