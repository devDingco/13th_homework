import { storage } from '@/commons/libraries/firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyApis() {
  const imageListRef = ref(storage, 'images');
  const [imageList, setImageList] = useState<string[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await listAll(imageListRef);
      console.log('🚀 ~ fetchFiles ~ response:', response);
      // 모든 URL을 동시에 가져옵니다.
      const urls = await Promise.all(
        response.items.map((item) => getDownloadURL(item))
      );
      setImageList((prev) => [...prev, ...urls]); // 상태 업데이트
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('useEffect 실행');
    fetchFiles();

    return () => {
      console.log('useEffect 클린업 실행');
    };
  }, []);

  return (
    <div className="w-full">
      {imageList.length ? (
        <div className="grid grid-cols-3 gap-1">
          {imageList.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`image-${index}`}
              className="w-full h-60 object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 p-8">
          <div>사진이 없습니다멍..</div>
          <Link className="border-2 rounded-lg p-2" href={'/myapis/new'}>
            등록하러 가기
          </Link>
        </div>
      )}
    </div>
  );
}
